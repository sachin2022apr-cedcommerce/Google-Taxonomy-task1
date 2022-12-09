import { Card, FlexChild, FlexLayout, Select } from '@cedcommerce/ounce-ui';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../fetchHook/FetchHook'
export default function Home() {
  const [amazonCategory, setAmazonCategory] = useState([]);
  const [selectedArray, setSelectedArry] = useState([]);
  const [options, setOptions] = useState([])
  const { fetchData } = useFetch();
  useEffect(() => {
    fetchData()
      .then(temp => {
        const data = []
        temp.split("\n").forEach((item, index) => {
          data.push(item.split(">"))
        });
        setAmazonCategory([...data])
        const tempOptions = []
        data.forEach((item) => {
          tempOptions.push((item[selectedArray.length]).replace(/^\s+|\s+$/gm, ''))
        })
        let  t1 = [...getUnique(tempOptions)]
        console.log(t1);
        t1.forEach((item, index) => {
          console.log(item);
        })
      })
  }, [])

  const getUnique = (array) => {
    let uniqueArr = [...new Set(array)];
    return uniqueArr
  }
  useEffect(() => {
    console.log(options);
  })
  return (
    <div>
      <FlexLayout halign="center" spacing="loose">
        <FlexChild desktopWidth="66" tabWidth="75" mobileWidth="80">
          <Card
            cardType="Bordered">
            {options.map((item, index) => {
              // return (<Select
              //     dropDownheight={200}
              //     onChange={function noRefCheck() { }}
              //     options= {[item]}
              //     placeholder="Select"
              //     // popoverContainer="body"
              //     thickness="thin"
              //   />)
              console.log([...item]);
            })} 
          </Card>
        </FlexChild>
      </FlexLayout>
      {/* {options.map((item, index) => {
        return (
          <select key={`parent${index}`}>
            {(item !== undefined) ? <>
              {item.map((childItem, childIndex) => {
                return <option>
                  {childItem}
                </option>
              })}
            </> : <></>}
          </select>)
      })} */}
    </div>
  )
}
