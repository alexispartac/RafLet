import React from 'react'


const baseFavicon = "https://all-favicons.s3.us-east-1.amazonaws.com/favicons/";
const ItemsShow: React.FC<{showOnes: boolean, setShowOnes: React.Dispatch<React.SetStateAction<boolean>>}> = ({showOnes, setShowOnes }) => {

  return (
        <div className='flex-row w-[50px] px-[2px] py-[14px] sm:w-[23px] '>
            {
                showOnes ? 
                <>
                <button onClick={() => setShowOnes(false)}>
                    <img src={baseFavicon + "two-items-empty.png"} alt="" />
                </button>
                <button >
                    <img src={baseFavicon + "rounded-rectangle-full.png"} alt="" />
                </button>
                </>
                :
                <>
                <button >
                    <img src={baseFavicon + "two-items-full.png"} alt="" />
                </button>
                <button onClick={() => setShowOnes(true)}>
                    <img src={baseFavicon + "rounded-rectangle.png"} alt="" />
                </button>
                </>
            }
        </div>
  )
}

export default ItemsShow;