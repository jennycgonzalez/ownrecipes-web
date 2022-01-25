import { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RatingWrapper from '../components/RatingWrapper';
import * as RatingsActions from '../actions/RatingsActions';

class Rating extends Component {
  componentDidMount() {
    this.props.ratingActions.load(this.props.match.params.recipe);
  }

  render() {
    const { ratings, user, match, ratingActions } = this.props;
    const recipeSlug = match.params.recipe;
    const data =  ratings.hasOwnProperty(recipeSlug) ? ratings[recipeSlug] : [];
    return (
      <RatingWrapper
          recipeSlug={recipeSlug}
          user={user}
          data={data}
          ratingActions={ratingActions}
      />
    );
  }
}

Rating.propTypes = {
  ratings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  ratingActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ratings: state.rating.ratings,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  ratingActions: bindActionCreators(RatingsActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rating);
