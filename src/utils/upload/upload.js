import http from '@/utils/request'

const fetchObsUrl = (fileExtensionList) => {
  return http.post('/market-capi/customer/sys/base/batch/uploadAuth', {
    fileExtensionList
  })
}

async function uploadFile (filePath) {
  const fileExtensionList = []
  const realFilePaths = []
  filePath.map(item => {
    const itemArr = item.split('.')
    fileExtensionList.push(itemArr[itemArr.length - 1])
  })
  const urlResponse = await fetchObsUrl(fileExtensionList)
  for (let i = 0; i < filePath.length; i++) {
    try {
      const realFilePath = await uploadRes(filePath[i], urlResponse[i])
      realFilePaths.push(realFilePath)
    } catch (e) {
      return false
    }
  }
  return (realFilePaths)
};

async function uploadRes (filePath, urlResponse) {
  return new Promise((resolve, reject) => {
    // 检查参数
    const url = urlResponse.signUrl
    const realFilePath = urlResponse.filePath
    const formData = urlResponse.formParams
    console.log(url)
    console.log(realFilePath)
    console.log(formData)
    // 做成一个上传对象
    // uni.uploadFile({
    //   url: url,
    //   filePath: filePath,
    //   name: 'file',
    //   formData: formData,
    //   success (res) {
    //     console.log('success', res)
    //     if (res.statusCode === 204) {
    //       resolve(realFilePath)
    //     } else {
    //       reject()
    //     }
    //   },
    //   fail (res) {
    //     console.log('fail', res)
    //     reject()
    //   }
    // })
  })
};

export {
  uploadFile
}
