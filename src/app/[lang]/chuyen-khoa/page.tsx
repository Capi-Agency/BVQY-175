import DepartmentDetailPage from '@/src/components/departments/DepartmentDetailPage';
import { getAllDepartmentGroups } from '@/src/services/department';

type Props = {};

const DepartmentListPageWrapper = async (props: Props) => {
  const departmentGroups = await getAllDepartmentGroups();
  const parentGroups = departmentGroups?.filter((d) => d.parent_group === null);

  return (
    <DepartmentDetailPage
      departmentGroups={departmentGroups as any[]}
      parentGroups={parentGroups as any[]}
    />
  );
};

export default DepartmentListPageWrapper;
