import { useOssClient } from '@/hooks';
import { OssClientInitProps } from '@/utils';
import { Button, message } from 'antd'

function Home() {
  const sourceURL = new URLSearchParams(window.location.search).get('sourceURL')

  const handleOssInitModalConfirm = (values: OssClientInitProps) => {
    initOSSClient(values);
    setOssInitModalOpen(false);
    if (sourceURL) {
      message.success('授权成功，即将跳转回原站点...', 1.2)
      setTimeout(() => {
        window.location.href = sourceURL
      }, 1200);
    } else {
      message.success('授权成功')
    }
  };

  const { initOSSClient, setOssInitModalOpen } =
    useOssClient(handleOssInitModalConfirm);

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col '>
      <div className="text-3xl font-bold">
        Guard
      </div>
      <Button type='primary' className='mt-3 bg-theme hover:!bg-theme'
        onClick={()=>{
          localStorage.removeItem('oss-config')
          message.success('重置成功，即将重新初始化', 1.2)
          setTimeout(() => {
            window.location.reload()
          }, 1200);
        }}
      >重置</Button>
    </div>
  );
}

export default Home;
