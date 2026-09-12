// ===========================
// Workflow Engine
// Handles execution of a Workflow with SYNC, ASYNC, and END nodes
// ===========================

import { GenericNode } from "../nodes/abstract.node";
import { NodeType } from "../types/node.types";
import {
  NodeResultType,
  WorkflowContext,
  WorkflowState,
} from "../types/workflow.types";
import { Workflow } from "./workflow";

export class WorkflowEngine {
  constructor(
    private workflow: Workflow, // the workflow containing nodes and edges
    private state: WorkflowState, // current state, including context and current node
  ) {}

  // Main engine loop: runs nodes until workflow completes or hits an ASYNC node
  async run(): Promise<WorkflowState> {
    while (this.state.currentNodeId && !this.state.completed) {
      const currentNode: GenericNode = this.workflow.getNode(
        this.state.currentNodeId,
      );

      switch (currentNode.type) {
        case NodeType.SYNC: {
          // Resolve SYNC node immediately and continue to next node
          await this.runSyncNode(currentNode);
          break;
        }

        case NodeType.ASYNC: {
          // Execute ASYNC node and pause engine until data is stored
          await this.runAsyncNode(currentNode);
          return this.state; // pause engine
        }

        case NodeType.END: {
          // Mark workflow as completed
          await this.applyNodeResult(
            currentNode.id,
            { currentNode: currentNode.id },
            NodeResultType.ResolvedResult,
          );

          this.state.completed = true;
          return this.state; // stop engine
        }

        default:
          throw new Error(`Unknown node type: ${currentNode.type}`);
      }

      // Move to next node based on current node's output pin
      this.state.currentNodeId = await this.determineNextNode(currentNode);
    }

    return this.state; // workflow fully processed
  }

  // Apply the result of a node execution or resolution to the workflow state
  private async applyNodeResult(
    nodeId: string,
    context: WorkflowContext,
    type: NodeResultType,
  ): Promise<void> {
    const currentNode = this.state.currentNodeId;

    // Merge new context into the current state
    // 🔥 ALWAYS merge currentNodeId into context
    const mergedContext = this.computeLatestContext([
      this.state.context,
      context,
      { currentNode }, // ✅ enforce here
    ]);

    this.state.context = mergedContext;

    this.state.results.push({
      nodeId,
      result: mergedContext,
      type,
    });
  }

  // Run a synchronous node: resolve immediately and apply its result
  private async runSyncNode(node: GenericNode): Promise<void> {
    const context: WorkflowContext = await node.resolve(this.state.context);
    await this.applyNodeResult(node.id, context, NodeResultType.ResolvedResult);
  }

  // Run an asynchronous node: execute and store the result, engine will pause
  private async runAsyncNode(node: GenericNode): Promise<void> {
    if (!node.execute) {
      throw new Error(`Async node ${node.id} does not implement execute`);
    }

    const result: WorkflowContext = await node.execute(this.state.context);
    this.state.currentNodeId = node.id; // keep current node active

    await this.applyNodeResult(node.id, result, NodeResultType.ExecutionResult);
  }

  // Store data from an ASYNC node and resume workflow execution
  async storeCollectedData(payload: WorkflowContext): Promise<WorkflowState> {
    const nodeId: string = this.state.currentNodeId!;
    const node: GenericNode = this.workflow.getNode(nodeId);

    if (node.type !== NodeType.ASYNC) {
      throw new Error(`storeCollectedData can only be used for async nodes`);
    }

    // Resolve node with provided payload
    const context: WorkflowContext = await node.resolve(payload);

    await this.applyNodeResult(node.id, context, NodeResultType.ResolvedResult);

    // Move to next node and continue running
    this.state.currentNodeId = await this.determineNextNode(node);
    return this.run();
  }

  // Determine the next node in the workflow based on output pin and edges
  private async determineNextNode(node: GenericNode): Promise<string> {
    if (!node.determineOutputPin) {
      throw new Error("no outputs -> workflow path ends");
    }

    const outputPin: string = await node.determineOutputPin(this.state.context);
    const edge = this.workflow.findEdgeFromPin(node.id, outputPin);

    return edge?.targetNodeId;
  }

  // Merge multiple contexts into a single workflow context
  private computeLatestContext(contexts: WorkflowContext[]): WorkflowContext {
    return contexts.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }
}
