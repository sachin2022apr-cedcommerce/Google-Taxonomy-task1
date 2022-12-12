import { FlexChild, FlexLayout, Select, Toast, ToastWrapper } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../fetchHook/FetchHook'
export default function Home() {
  const [amazonCategory, setAmazonCategory] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);
  const [options, setOptions] = useState([])
  const [toastActive, setToastActive] = useState(false)
  const { fetchData } = useFetch();
  useEffect(() => {
    fetchData()
      .then(result => {
        const data = []
        result.split("\n").forEach((item, index) => {
          data.push(item.split(" > "))
        });
        setAmazonCategory([...data])
        const tempOptions = []

        data.forEach((item) => {
          tempOptions.push(item[0])
        })
        let t1 = [...getUnique(tempOptions)]
        let tempData = [];
        t1.forEach((item, index) => {
          tempData.push({ label: item, value: item })
        })
        setOptions([tempData])
      })
  }, [])

  const getUnique = (array) => {
    let uniqueArr = [...new Set(array)];
    return uniqueArr
  }

  useEffect(() => {
    let optionLength = selectedArray.length
    const tempOptions = []
    amazonCategory.forEach((item, index) => {
      if (selectedArray[optionLength - 1].value === item[optionLength - 1] && item[optionLength] !== undefined) {
        tempOptions.push(item[optionLength])
      }
    })
    if (tempOptions.length) {
      console.log(tempOptions)
      let t1 = [...getUnique(tempOptions)]
      let tempData = []
      t1.forEach((item, index) => {
        tempData.push({ label: item, value: item })
      })
      setOptions([...options, tempData])
    } else {
      if (options.length)
        setToastActive(true)
    }

  }, [selectedArray])
  console.log(amazonCategory);
  const handleSelectValue = (value, index) => {
    var optionSplice = [...options]
    var selectedSplice = [...selectedArray]

    if (selectedArray.length > index) {
      optionSplice.splice(index + 1);
      selectedSplice.splice(index + 1);
      setOptions([...optionSplice])
    }

    selectedSplice[index] = {
      label: value,
      value: value
    }
    setSelectedArray([...selectedSplice])
  }

  const handleToast = () => {
    setToastActive(!toastActive)
  }
  const toastMarkup = toastActive ? (<Toast
    message="no more child"
    onDismiss={() => handleToast()}
    timeout={3000}
    type="error"
  />) : <></>

  return (<>
    <FlexLayout halign="center" spacing="tight">
      {options.map((item, index) => {
        return (<FlexChild desktopWidth="50" tabWidth="66" mobileWidth="80">
          <Select
            dropDownheight={500}
            onChange={(value) => handleSelectValue(value, index)}
            options={[...item]}
            placeholder="Select"
            thickness="thin"
            value={selectedArray[index]?.value}
          />
        </FlexChild>)
      })}

    </FlexLayout>
    <ToastWrapper>
      {toastMarkup}
    </ToastWrapper>
  </>)
}
