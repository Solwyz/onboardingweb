function DepartmentList({ departmentData }) {
  return (
    <div className='mt-8'>
      <h2 className='text-[24px] font-medium'>Resource List</h2>
      <table className='table-auto w-full mt-4 border'>
        <thead>
          <tr className='bg-[#465062] h-[48px] text-white text-[16px]'>
            <th className='font-light'>Name</th>
            <th className='font-light'>Resource Manager</th>
            <th className='font-light'>Office</th>
            <th className='font-light'>Value Stream</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((department, index) => (
            <tr key={index} className='text-center'>
              <td className='px-4 py-2 border-b'>{department.name}</td>
              <td className='px-4 py-2 border-b'>{department.resourceManager}</td>
              <td className='px-4 py-2 border-b'>{department.office}</td>
              <td className='px-4 py-2 border-b'>{department.valueStream}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
