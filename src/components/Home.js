import { FlexChild, FlexLayout, Select, Toast, ToastWrapper } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../fetchHook/FetchHook'
export default function Home() {
  // state for all amazon category 2-D data
  const [amazonCategory, setAmazonCategory] = useState([]);
  // value of each select box
  const [selectedArray, setSelectedArray] = useState([]);
  // options for each comming up select
  const [options, setOptions] = useState([])
  // toast state
  const [toastActive, setToastActive] = useState(false)

  // useFetch hook 
  const { fetchData } = useFetch();

  // default useEffect for getting data execute only one time
  useEffect(() => {
    fetchData().then(result => {
      let data = []
      result.split("\n").forEach((item) => {
        data.push(item.split(" > "))
      })
      setAmazonCategory([...data])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect executes each time select changes
  useEffect(() => {
    let optionLength = selectedArray.length
    let tempOptions = []
    amazonCategory.forEach((item) => {
      if (optionLength === 0)
        tempOptions.push(item[optionLength])
      else if (selectedArray[optionLength - 1].value === item[optionLength - 1] && item[optionLength] !== undefined)
        tempOptions.push(item[optionLength])
    })
    if (tempOptions.length) {
      let optionDataObject = []
      let uniqueOptions = [...getUnique(tempOptions)]
      uniqueOptions.forEach((item) => {
        optionDataObject.push({ label: item, value: item })
      })
      if (!options.length)
        setOptions([optionDataObject])
      else
        setOptions([...options, [...optionDataObject]])
    }
    else {
      if (options.length) setToastActive(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amazonCategory, selectedArray])

  // function for getting unique array
  const getUnique = (array) => {
    let uniqueArr = [...new Set(array)];
    return uniqueArr
  }
  // function for select onChange
  const handleSelectValue = (value, index) => {
    var optionSplice = [...options]
    var selectedSplice = [...selectedArray]
    if (selectedArray.length > index) {
      optionSplice.splice(index + 1);
      selectedSplice.splice(index + 1);
    }
    selectedSplice[index] = { label: value, value: value }
    setSelectedArray([...selectedSplice])
    setOptions([...optionSplice])
  }
  return (<>
    <FlexLayout halign="center" spacing="tight">
      {options.map((item, index) => {
        return (<FlexChild key={index} desktopWidth="50" tabWidth="66" mobileWidth="80">
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
    <ToastWrapper>{toastActive &&
      <Toast message="Has Child : False"
        onDismiss={() => setToastActive(!toastActive)}
        timeout={2000} type="error"
      />}
    </ToastWrapper>
  </>)
}