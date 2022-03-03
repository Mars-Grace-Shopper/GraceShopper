import React from 'react';

//this will take in the all pies and filter to show random single views
export default function FeaturedItems() {
  return (
    <div className='featured-items-container'>
      <div className='carousel-wrapper'>
        <img src='https://tippinspies.com/wp-content/uploads/2020/07/Tippins-Cherry-Apple-Pie-slices-1200x801.jpg' />
        <img src='https://images.pexels.com/photos/5852256/pexels-photo-5852256.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
        <img src='https://images.food52.com/0KNWpqc-lswQQlPkarGa12wOwL4=/1200x675/b117d61b-7fb5-4ceb-aff2-dc2cba1fe8a4--2014-0618_pies_collection-032.jpg' />
        <img src='https://www.coles.com.au/content/dam/coles/inspire-create/sep20-images/September20-mexican-style-mini-pies-976x549.jpg' />
        <img src='https://media.istockphoto.com/photos/assortment-of-homemade-fall-pies-table-scene-on-dark-wood-picture-id1345857656?b=1&k=20&m=1345857656&s=170667a&w=0&h=wqllyLsxtBHkx53oALDz4QZSWZn8rDlUl0anfEzrhtY=' />
        <img src='https://images.pexels.com/photos/2035738/pexels-photo-2035738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
      </div>
    </div>
  );
}
