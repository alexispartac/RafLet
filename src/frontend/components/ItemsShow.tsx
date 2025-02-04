import React from 'react'

const ItemsShow: React.FC<{showOnes: boolean, setShowOnes: React.Dispatch<React.SetStateAction<boolean>>}> = ({showOnes, setShowOnes }) => {

  return (
        <div className='show-items'>
            {
                showOnes ? 
                <>
                <button onClick={() => setShowOnes(false)}>
                    <img src="./src/assets/favicons/two-items-empty.png" alt="" />
                </button>
                <button >
                    <img src="./src/assets/favicons/rounded-rectangle-full.png" alt="" />
                </button>
                </>
                :
                <>
                <button >
                    <img src="./src/assets/favicons/two-items-full.png" alt="" />
                </button>
                <button onClick={() => setShowOnes(true)}>
                    <img src="./src/assets/favicons/rounded-rectangle.png" alt="" />
                </button>
                </>
            }
        </div>
  )
}

export default ItemsShow;