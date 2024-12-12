import React from 'react'
import tickIcon from '../../../../Assets/HrTas/check.svg';

function NewProgressive({ stage }) {

    const stages = ["Basic", "Professional", "Salary", "Personal", "Contact", "Physical", "Final"];

    const currentIndex = stages.indexOf(stage)

    return (
        <div>
            <div className='flex justify-center mt-[32px]'>
                <ol className="flex items-center w-[678px]">

                    {stages.map((label, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isLastStage = index === stages.length - 1;
                        const afterBorderColor = isCompleted ? '#2B2342' : '#C2C2C2';
                        const circleBgColor = isCompleted ? '#2B2342' : '#DCDCDC';
                        const circleIcon = isCompleted ? tickIcon : null;
                        const textColor = isCompleted ? '#2B2342' : '#696A70';

                        return (

                            <li key={label} className="flex flex-col items-start  w-full text-center" >
                                <div className={`flex w-full items-center ${!isLastStage ? "text-[#2B2342] after:content-[''] after:w-full after:h-1 after:border-b-[1px]" : ""} ${isCompleted ? 'after:border-[#2B2342]' : 'after:border-[#C2C2C2]'}  after:inline-block`}>
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full shrink-0" style={{ backgroundColor: circleBgColor }}>
                                        {circleIcon && (
                                            <img src={tickIcon} alt="" className="w-3 h-3" />
                                        )}
                                    </span>
                                </div>
                                <span className="mt-2 text-sm font-normal  text-[#2B2342] ml-[-5px]">{label}</span>
                            </li>

                        )

                    })}
                    

                </ol>
            </div>
        </div>
    )
}

export default NewProgressive

