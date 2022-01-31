import React from 'react';

export default function CancelModal({ ModalToggle, showModal, setCancel, loadings, cancelRes })
{
    return (
        <div className="modal fade" id="cancelModal" style={{display: (showModal) ? 'block' : 'none', opacity: (showModal) ? '1' : '0'}} tabIndex="-1" role="dialog" aria-labelledby="cancelModal">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cancelModal">Confirmation</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>ModalToggle()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            (loadings) ? 
                                <p>Are you sure you want to cancel?</p>
                            :
                                (loadings == false && cancelRes.status == '200') ?
                                    <div className="d-flex flex-column text-center">
                                        <i className="far fa-check-circle cancel-success"></i>
                                        <p>{cancelRes.message}</p>
                                    </div>
                                :
                                    <div className="d-flex flex-column text-center">
                                        <i className="far fa-times-circle cancel-failure"></i>
                                        <p>{cancelRes.message}</p>
                                    </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={()=>ModalToggle()}>Close</button>
                        {
                            (loadings) ?
                                <button type="button" className="btn btn-danger" onClick={()=>setCancel(true)}>Cancel Booking</button>
                            :
                                ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}