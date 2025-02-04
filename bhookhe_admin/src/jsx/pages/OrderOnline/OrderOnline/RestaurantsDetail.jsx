import React, { useEffect, useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rate } from 'rsuite';
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import apis from "../../../../services/apis/index"
import Swal from "sweetalert2";


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'

import PageTitle from "../../../layouts/PageTitle";

import avater1 from "../../../../assets/images/avatar/1.jpg";
import product1 from "../../../../assets/images/product/1.jpg";
import product2 from "../../../../assets/images/product/2.jpg";
import product3 from "../../../../assets/images/product/3.jpg";
import product4 from "../../../../assets/images/product/4.jpg";
import product5 from "../../../../assets/images/product/5.jpg";
import product6 from "../../../../assets/images/product/6.jpg";
import product7 from "../../../../assets/images/product/7.jpg";

import tab1 from "../../../../assets/images/tab/1.jpg";
import tab2 from "../../../../assets/images/tab/2.jpg";
import tab3 from "../../../../assets/images/tab/3.jpg";
import tab4 from "../../../../assets/images/tab/4.jpg";
import { getRestaurantByIdApi } from "../../../../services/apis/RestaurantsApi";
import { getFoodByRestaurantIdApi } from "../../../../services/apis/FoodApi";
import Loader from "../../../components/Loader/Loader";


const sliderDatas = [
  { image: product1, title: 'Strapless Dress', price1: '369.00', price2: '206' },
  { image: product2, title: 'Blazer Dress', price1: '450.00', price2: '310' },
  { image: product3, title: 'Kimono Dress', price1: '340.00', price2: '120' },
  { image: product4, title: 'Asymmetrical Dress', price1: '520.00', price2: '210' },
  { image: product5, title: 'Slip dress', price1: '390.00', price2: '105' },
  { image: product6, title: 'Little black dress', price1: '410.00', price2: '140' },
  { image: product7, title: 'Bandage Dress', price1: '620.00', price2: '130' },
];

const RestaurantsDetail = () => {
  const { id } = useParams();
  const [reviewToggle, setReviewToggle] = useState(false);
  const [active, setActive] = useState("")
  const [restaurant, setRestaurant] = useState();
  const [sliderData, setSliderData] = useState();
  const [foodItem, setFoodItem] = useState();
  const [loading, setLoading] = useState(false);

  console.log("foodItem foodItem", sliderData)
  // let sliderData = [];


  // Array of cuisine classes (you can customize these)
  const cuisineClasses = [
    "badge badge-primary light me-1", // For snacks
    "badge badge-secondary light me-1", // For Maggi
    "badge badge-success light me-1", // For Hot Dog
    "badge badge-danger light me-1", // For Chinese
    "badge badge-primary light me-1", // For snacks
    "badge badge-secondary light me-1", // For Maggi
    "badge badge-success light me-1", // For Hot Dog
    "badge badge-danger light me-1", // For Chinese
    "badge badge-primary light me-1", // For snacks
    "badge badge-secondary light me-1", // For Maggi
    "badge badge-success light me-1", // For Hot Dog
    "badge badge-danger light me-1", // For Chinese
    "badge badge-primary light me-1", // For snacks
    "badge badge-secondary light me-1", // For Maggi
    "badge badge-success light me-1", // For Hot Dog
    "badge badge-danger light me-1", // For Chinese
  ];

  // const fetchRestaurants = async () => {
  //   try {
  //     const res = await getRestaurantByIdApi(id);
  //     console.log(res, "roles is here");
  //     setRestaurant(res.restaurant);
  //   } catch (error) {

  //   }
  // }

  const fetchRestaurants = async () => {
    try {
        setLoading(true);  // Start loader before making the API call
        const res = await getRestaurantByIdApi(id);  // Fetch restaurant data by ID
        setRestaurant(res?.restaurant);  // Set the restaurant data if the API call is successful
    } catch (error) {
        Swal.fire({
            icon: 'error',  // Show error icon
            title: "Restaurant Details Not Found!!",  // Error title
            text: error?.message || "An error occurred while fetching the restaurant details.",  // Show the error message
            showConfirmButton: true  // Show a confirmation button
        });
    } finally {
        setLoading(false);  // Always stop the loader in both success and error cases
    }
};

  const fetchFoodByRestaurantId = async () => {
    try {
      setLoading(true)
      const res = await getFoodByRestaurantIdApi(id);

      const foodItems = res?.data?.foodItems || [];
      const seenTitles = new Set();

      // Map the food items and filter out duplicate titles
      const uniqueSliderData = foodItems.reduce((acc, item) => {
        const title = item.category.name;

        // Only add item if title hasn't been seen yet
        if (!seenTitles.has(title)) {
          acc.push({
            image: item.category.image
              ? `${apis.baseurl.Baseimageurl}${item.category.image}`
              : product1, // Use category image if available, else fallback
            title: item.category.name, // Category name
            price1: (item.price + item.discount).toFixed(2), // Price after discount
            price2: item.price.toFixed(2), // Original price
          });

          // Mark the title as seen
          seenTitles.add(title);
        }

        return acc;
      }, []);

      // Set the unique slider data
      setSliderData(uniqueSliderData);

      // Also set the food items if needed
      setFoodItem(foodItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  // const fetchFoodByRestaurantId = async () => {
  //   try {
  //     const res = await getFoodByRestaurantIdApi(id);

  //     // Set slider data directly by mapping food items
  //     setSliderData(
  //       res?.data?.foodItems?.map(item => ({
  //         image: item.category.image
  //           ? `${apis.baseurl.Baseimageurl}${item.category.image}`
  //           : product1, // Use category image if available, else fallback
  //         title: item.category.name, // Category name
  //         price1: (item.price + item.discount).toFixed(2), // Price after discount
  //         price2: item.price.toFixed(2), // Original price
  //       })) || [] // Fallback to empty array if no food items
  //     );

  //     setFoodItem(res?.data?.foodItems)
  //     console.log(res, sliderData, "Response is here")
  //   } catch (error) {

  //   }
  // }

  useEffect(() => {
    fetchRestaurants()
    fetchFoodByRestaurantId()
  }, [])


  return (
    <>
     <Loader visible={loading} />
      <PageTitle motherMenu="Restaurant" activeMenu="Restaurant Details" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                  {/* Tab panes */}
                  <Tab.Container defaultActiveKey="first">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <img className="img-fluid rounded" src={restaurant?.logo ? `${apis.baseurl.Baseimageurl}${restaurant.logo}` : 'https://www.shutterstock.com/image-vector/restaurant-logo-template-260nw-1254530365.jpg'} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <img className="img-fluid rounded" src={product2} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <img className="img-fluid rounded" src={product3} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="four">
                        <img className="img-fluid rounded" src={product4} alt="" />
                      </Tab.Pane>
                    </Tab.Content>
                    {/* <div className="tab-slide-content new-arrival-product mb-4 mb-xl-0">                      
                      <Nav
                        as="ul"
                        className="nav slide-item-list mt-3"                        
                      >
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="first" to="#first">
                            <img
                              className="img-fluid rounded"
                              src={tab1}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="second" to="#second">
                            <img
                              className="img-fluid rounded"
                              src={tab2}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="third" to="#third">
                            <img
                              className="img-fluid rounded"
                              src={tab3}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" to="#for" eventKey="four">
                            <img
                              className="img-fluid rounded"
                              src={tab4}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div> */}
                  </Tab.Container>
                </div>
                {/*Tab slider End*/}

                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                  <div className="product-detail-content">
                    {/*Product details*/}
                    <div className="new-arrival-content pr">
                      <h4>{restaurant?.restaurantName}</h4>
                      <div className="comment-review star-rating">
                        <ul>
                          {" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa-solid fa-star-half-stroke" />
                          </li>{" "}
                          <li>
                            <i className="fa-solid fa-star-half-stroke" />
                          </li>
                        </ul>
                        <span className="review-text">(34 reviews) / </span>
                        <Link
                          onClick={() => setReviewToggle(true)}
                          className="product-review"
                          to="/ecom-product-detail"
                        >
                          Write a review?
                        </Link>
                      </div>
                      <div className="d-table mb-2">
                        <p className="price float-left d-block">325.00₹</p>
                      </div>
                      <p>
                        Availability:{" "}
                        <span className="item">
                          {" "}
                          In stock <i className="fa fa-shopping-basket" />
                        </span>
                      </p>
                      {/* <p>
                        Product code: <span className="item">0405689</span>{" "}
                      </p> */}
                      {/* <p>
                        Brand: <span className="item">Lee</span>
                      </p> */}
                      {/* <p>
                        Product tags:&nbsp;&nbsp;
                        <span className="badge badge-success light me-1">
                          bags
                        </span>
                        <span className="badge badge-danger light me-1">
                          clothes
                        </span>
                        <span className="badge badge-warning light me-1">
                          shoes
                        </span>
                        <span className="badge badge-info light me-1">
                          dresses
                        </span>
                      </p> */}
                      {/* className="badge badge-primary light me-1" */}
                      {restaurant?.cuisine && (
                        <p>
                          Cuisines:&nbsp;&nbsp;
                          {restaurant.cuisine.map((item, index) => (
                            <span key={index} className={cuisineClasses[index]} >
                              {item}
                            </span>
                          ))}
                        </p>
                      )}
                      <p className="text-content">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing.
                      </p>
                      <div className="d-flex align-items-end flex-wrap mt-4">
                        {/* <div className="filtaring-area me-3">
                          <div className="size-filter">
                            <h4 className="m-b-15">Select size</h4>
                            <div className="btn-group mb-sm-0 mb-2 invisible-main" data-toggle="buttons">
                              <label                                 
                                className={`btn btn-outline-primary mb-0  ${active === '1' ? 'active' : ''}`}  onClick={()=>setActive('1')}
                              >
                                <input type="radio" className="position-absolute invisible"  />{" "}
                                XS
                              </label>
                              <label 
                                className={`btn btn-outline-primary mb-0 ${active === '2' ? 'active' : ''}`}  onClick={()=>setActive('2')}
                              >
                                <input type="radio" className="position-absolute invisible "   />
                                SM
                              </label>
                              <label className={`btn btn-outline-primary mb-0 ${active === '3' ? 'active' : ''}`}  onClick={()=>setActive('3')}>
                                <input type="radio" className="position-absolute invisible "   />{" "}
                                MD
                              </label>
                              <label className={`btn btn-outline-primary mb-0 ${active === '4' ? 'active' : ''}`}  onClick={()=>setActive('4')}>
                                <input type="radio" className={`position-absolute invisible ${active === '4' ? 'active': ''}`}  />{" "}
                                LG
                              </label>
                              <label className={`btn btn-outline-primary mb-0 ${active === '5' ? 'active' : ''}`}  onClick={()=>setActive('5')}>
                                <input type="radio" className="position-absolute invisible "  />{" "}XL
                              </label>
                            </div>
                          </div>
                        </div> */}

                        {/* <div className="col-2 px-0  me-3">
                          <input type="number" name="num" className="form-control input-btn input-number" defaultValue={1} />
                        </div>
                        <div className="shopping-cart me-3">
                          <Link className="btn btn-primary mt-2" to="#">
                            <i className="fa fa-shopping-basket me-2" />
                            Add to cart
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* review */}
        <Modal show={reviewToggle} className="modal fade" id="reviewModal" centered>
          <>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review</h5>
                <button
                  type="button"
                  onClick={() => setReviewToggle(false)}
                  className="btn-close"
                  data-dismiss="modal"
                >

                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReviewToggle(false);
                  }}
                >
                  <div className="text-center mb-4">
                    <img
                      className="img-fluid rounded"
                      width={78}
                      src={avater1}
                      alt="DexignZone"
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-widget mb-4 text-center">
                      {/* Rating Stars Box */}
                      <div className="rating-stars">
                        <Rate
                          defaultValue={3}
                          className="product-rating"
                          onChange={(data) => {
                            alert(`Thanks! You rated this ${data} stars.`)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Comment"
                      rows={5}
                      defaultValue={""}
                    />
                  </div>
                  <button className="btn btn-success btn-block">RATE</button>
                </form>
              </div>
            </div>
          </>
        </Modal>
      </div>
      <h4 className="fs-20 font-w700 my-4">MENUS</h4>
      <div className="owl-carousel card-slider">
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 2000
          }}
          breakpoints={{

            360: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay]}
        >
          {sliderData?.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="">
                <div className="card">
                  <div className="card-body product-grid-card">
                    <div className="new-arrival-product">
                      <div className="new-arrivals-img-contnent">
                        <img className="img-fluid rounded" style={{ width: '250px', height: '150px' }} src={data.image} alt="" />
                      </div>
                      <div className="new-arrival-content text-center mt-3">
                        {/* <Link to='/menus'> */}
                        <Link
                          to='/menus'
                          state={{
                            filteredData: foodItem?.filter(item => item?.category?.name === data.title)
                          }}>
                          <h4>{data.title}</h4>
                        </Link>
                        <ul className="star-rating">
                          <li><i className="fa fa-star" /></li>{" "}
                          <li><i className="fa fa-star" /></li>{" "}
                          <li><i className="fa fa-star" /></li>{" "}
                          <li><i className="fa fa-star" /></li>{" "}
                          <li><i className="fa fa-star" /></li>
                        </ul>
                        <span className="price">{data.price1}₹</span>{" "}
                        <del className="discount">{data.price2}₹</del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </>
  );
};

export default RestaurantsDetail;
