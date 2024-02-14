import React from 'react';
import SponsorList from './SponsorList';

<<<<<<< HEAD
function CompletedComments() {
  return <SponsorList />;
=======
function CompletedComments({ userComment, setUserComment }) {
  return <SponsorList userComment={userComment} setUserComment={setUserComment} />;
>>>>>>> 233c56a9fb02d6709a0f987adadb393990787779
}

export default CompletedComments;
