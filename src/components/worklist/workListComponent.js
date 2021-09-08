import { WorkList } from "./WorkList";
import { WorkListTemplate } from "./WorkListTemplate";

export const WorkListComponent = () => {
  const workListDisplay = <WorkList />;
  return <WorkListTemplate workList={workListDisplay} />;
};
