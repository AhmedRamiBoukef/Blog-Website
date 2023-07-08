import { FC } from 'react'

interface loadingProps {
  
}

const Loading: FC<loadingProps> = ({}) => {
  return <div className='bg-slate-800 text-slate-200 flex justify-center items-center w-full h-full'>loading</div>
}

export default Loading