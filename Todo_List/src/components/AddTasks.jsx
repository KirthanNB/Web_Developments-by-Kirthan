import React, { useState, useCallback } from 'react';

const AddTasks = () => {
  return (
    <div className='flex border-[#ffffff5f] border-x-50 flex-col items-center justify-center bg-[#11111199] p-4  rounded-lg shadow-lg'>
      <form className='flex space-x-4'>
        <h1 className='text-4xl text-white'>Add Task</h1>
        <input
          type='text'
          placeholder='Enter Task'
          className='p-2 border-y-2 text-white text-xl border-gray-300 w-3xl rounded flex-grow'
        />
        <li className='list-none text-white cursor-pointer rounded-3xl bg-[#084e3349] font-bold border-[3px] flex justify-center items-center border-[#ffffff58] p-3 hover:transform hover:scale-105 hover:shadow-lg transition-transform duration-10 hover:bg-[#4b2f5511] hover:text-[#6cffccae]'>Add Task</li>
      </form>
    </div>
  );
};

export default AddTasks;