import React from "react";
import { Modal, Button } from "react-bootstrap";

const VideoModel = ({ show, handleClose, videoUrl }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>فيديو</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="video-container">
          {/* Replace with the video URL or video component */}
          <iframe
            width="100%"
            height="315"
            src={videoUrl}
            frameBorder="0"
            allowFullScreen
            title="Video"
          ></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoModel;
