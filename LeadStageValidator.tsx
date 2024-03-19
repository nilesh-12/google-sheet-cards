import { UseQueryResult } from "@tanstack/react-query";
import { RenderQuery } from "./RenderQuery";
import { app } from "./app"

const LeadStageResolveError = (props: UseQueryResult) => {
  console.log(props.error.valid)
  const missing = props.error.missing ?? []
  return <div>
    Error: {missing.join(', ')}
  </div>
}

const LeadStageValidator = ({ refId, stage, children }) => {
  // server will validate the lead in it's current stage
  const response = app.queries.useValidateStageQuery({ refId });

  console.log(response.data)

  return <RenderQuery response={response} renderError={LeadStageResolveError}>
    {children}
  </RenderQuery>

}

export default LeadStageValidator
