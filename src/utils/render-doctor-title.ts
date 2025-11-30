const hospitalMap: Record<string, string> = {
  director: 'Giám đốc bệnh viện',
  deputy_director: 'Phó giám đốc bệnh viện',
  doctor: 'Bác sĩ điều trị',
};

const instituteMap: Record<string, string> = {
  director: 'Giám đốc',
  deputy_director: 'Phó giám đốc',
};

const departmentMap: Record<string, string> = {
  head_of_department: 'Chủ nhiệm',
  deputy_head_of_department: 'Phó Chủ nhiệm',
  head_nurse: 'Điều dưỡng trưởng',
};

export const getDoctorTitles = (doctor: any) => {
  const titles: string[] = [];

  // ---- Hospital level ----
  if (doctor?.hospital_title && hospitalMap[doctor.hospital_title]) {
    titles.push(hospitalMap[doctor.hospital_title]);
  }

  // ---- Institute level ----
  const instituteName =
    doctor?.department_groups?.[0]?.department_groups_slug?.title || '';

  if (doctor?.institute_title && instituteMap[doctor.institute_title]) {
    titles.push(`${instituteMap[doctor.institute_title]} ${instituteName}`);
  }

  // ---- Department level ----
  const departmentName = doctor?.departments?.[0]?.department?.title || '';

  if (doctor?.department_title && departmentMap[doctor.department_title]) {
    titles.push(`${departmentMap[doctor.department_title]} ${departmentName}`);
  }

  return titles;
};
