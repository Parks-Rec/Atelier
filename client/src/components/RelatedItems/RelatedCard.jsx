/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'

export const CompareContext = React.createContext()

const PrimaryImage = styled.img`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 320px;
width: 250px;
object-fit: contain;
margin: 10px;
background-color: #f0ffff;
`

const RelatedItemsCard = styled.div`
position: relative;
height: 450px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const CompareButton = styled.button`
position: absolute;
z-index: 3;
left: 400px;
top: 200px;
`

const StrikePrice = styled.div`
text-decoration: line-through;
text-decoration-thickness: 0.15rem;
`

const SalesPrice = styled.div`
color: red;
`

export default function RelatedCard({id, setID, currentFeatures}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]); // name, category, features, default price
  const [relatedStyleInfo, setRelatedStyleInfo] = useState([]); // sale price, photos
  const [hoverStatus, setHoverStatus] = useState(false);
  const [compareProducts, setCompareProducts] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);


  const getRelatedInfo = () => {
    axios.get(`/products/${id}`)
      .then((res) => {
      // console.log('product level info: ', res.data);
      let relatedLevelInfo = {name: res.data.name, category: res.data.category, features: res.data.features}
      setRelatedProductInfo(relatedLevelInfo);
    })
    .catch(() => {
      console.log('GET request failed for relatedInfo')
    })
    axios.get(`/products/${id}/styles`)
      .then((res) => {
      // console.log('product styles: ', res.data);
      let primaryPhoto = '';
      if (res.data.results[0].photos[0].url === null) {
        primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      } else {
        primaryPhoto = res.data.results[0].photos[0].url;
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setRelatedStyleInfo(styleInfo);
    })
    .then(() => {
      setHasLoaded(true)
    })
    .catch((err) => {
      console.log('GET request failed for productStyles')
    })
  }

  // useEffect(() => {
  //   getRelatedInfo();
  // }, [])

  useEffect(() => {
    getRelatedInfo();
  }, [id])

  let onHover = () => {
    setHoverStatus(true);
  }
  let offHover = () => {
    setHoverStatus(false);
  }

  let setCompareOn = () => {
    setCompareProducts(true)
  }

  let setCompareOff = () => {
    setCompareProducts(false)
  }

  return (
    <CompareContext.Provider value={compareProducts}>
      <div>
      {compareProducts ? <div><ComparisonModal id={id} relatedFeatures={relatedProductInfo.features} currentFeatures={currentFeatures}/><CompareButton onClick={setCompareOff}>EXIT</CompareButton></div> : null}
      {hasLoaded && <RelatedItemsCard>
        <button onClick={setCompareOn}>Star</button>
        <PrimaryImage src={relatedStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(id)}></PrimaryImage>
        {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(id)}><div>{relatedProductInfo.category}</div>
        <div >{relatedProductInfo.name}</div>
        {relatedStyleInfo.sale_price && relatedStyleInfo.sale_price !== null ?
        <div><StrikePrice>{relatedStyleInfo.default_price}</StrikePrice><SalesPrice>{relatedStyleInfo.sale_price}</SalesPrice></div> : <div>{relatedStyleInfo.default_price}</div>}
        <div>Star rating goes here</div></div>}
        {/* <div>{relatedProductInfo.category}</div>
        <div>{relatedProductInfo.name}</div>
        <div>{relatedProductInfo.price}</div>
        <div>Star rating goes here</div> */}
      </RelatedItemsCard>}
    </div>
    </CompareContext.Provider>
  )
}


// const getRelatedInfo = async () => {
  //   let productLevelInfo = await axios.get(`/products/${item}`)
  //     .then((res) => {
  //     console.log('product level info: ', res.data);
  //     return res.data;
  //   })
  //   .catch(() => {
  //     console.log('GET request failed for relatedInfo')
  //   })

  //   let productStyles = await axios.get(`/products/${item}/styles`)
  //     .then((res) => {
  //     // console.log('product styles: ', res.data);
  //     return res.data;
  //   })
  //   .catch(() => {
  //     console.log('GET request failed for productStyles')
  //   })

  //   let primaryPhoto = '';
  //   if (productStyles.results[0].photos[0].url === null) {
  //     primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
  //   } else {
  //     primaryPhoto = productStyles.results[0].photos[0].url;
  //   }

  //   let relatedInfo = {
  //     name: productLevelInfo.name,
  //     category: productLevelInfo.category,
  //     price: productStyles.results[0].original_price,
  //     image: primaryPhoto
  //   }

  //   await setRelatedProductInfo(relatedInfo)
  // }