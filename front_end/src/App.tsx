import React from 'react';
import { BrowserRouter  as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store";
import { VideoRoomRouterR } from "./components/video-room";


/**
 * @constructor App representing the current front end for our application.
 */
class App extends React.Component {
  /**
   * Renders the application with React.
   * 
   * @returns {JSX.Element} The current layout of our application.
   */
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={VideoRoomRouterR} />
        </Router>
      </Provider>
    );
  }
}

export default App;
