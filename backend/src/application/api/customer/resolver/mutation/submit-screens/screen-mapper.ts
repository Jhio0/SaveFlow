import { ApplicationScreen } from "../../../../../../domain/entities/application";
import { ApplicationScreen as SchemaScreen } from "../../../schema";

export function mapDomainToSchemaScreen(
  screen: ApplicationScreen,
): SchemaScreen {
  return SchemaScreen[screen];
}
