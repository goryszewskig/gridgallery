import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { css } from 'styled-components';
import {Modal} from './Modal/Modal';
import  Posts from "./Posts";
import {Gallery} from './Gallery/Gallery';



// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.

class ModalSwitch extends React.Component {
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={Modal} />
        </Switch>
        {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}

export const Image = styled.div`
  width: 305px;
  height: 305px;
  @media(max-width:990 px){
    width: 100%;
  }
  background: no-repeat center/150% url(/img/${({index}) => index}.jpg) ;
  ${({inModal}) => !inModal && css`
    :hover {
      opacity: .7;
    }
`}
`




const Home = () => (
  <div>
    <Link to="/gallery">Visit the Gallery</Link>
    <h2>Featured Images</h2>
    <ul>
      <li>
        <Link to="/img/2">Tomato</Link>
      </li>
      <li>
        <Link to="/img/4">Crimson</Link>
      </li>
    </ul>
  </div>
);



// const ImageView = ({ match }) => {
//   const image = Posts[parseInt(match.params.id, 10) -1];
//   if (!image) {
//     return <div>Image not found</div>;
//   }

//   return (
//     <div>
//       <h1>{image.title}</h1>
//       <Image index={image.id} />
//     </div>
//   );
// };


const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalGallery;