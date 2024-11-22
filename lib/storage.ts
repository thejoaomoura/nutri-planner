export const saveFormData = (data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nutriplanner-data', JSON.stringify(data));
  }
};

export const loadFormData = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('nutriplanner-data');
    return data ? JSON.parse(data) : null;
  }
  return null;
};