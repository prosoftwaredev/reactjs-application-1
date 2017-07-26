import React from 'react';
import { Grid, Row, Col, ProgressBar, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Pagination from 'components/Common/Pagination';
import NoDataFound from 'components/Common/NoDataFound';
import juvo from 'juvo';
import Document from './Document';

const DocumentsComponent = ({
  documents,
  user,
  pagination,
  searchValue,
  uploadDocumentProgress,
  handleDocumentUpload,
  handleDocumentDownload,
  setDeleteDocument,
  setSearchValues,
  searchDocuments,
  searchPanel,
  toggleSearch,
  setDocument,
  handleSearchReset,
}) => (
  <Grid fluid className="contacts-page documents">
    <div className="contacts-content panel panel-box">
      <div className="listControls flex sb document">
        <h2>Document {pagination && pagination.total ? <span>({pagination.total})</span> : <span>(0)</span>}</h2>
        <div>
          <Button className={searchPanel ? 'active' : ''} bsStyle="primary" onClick={toggleSearch}>Search Documents <i className="fa fa-search" aria-hidden="true" /></Button>
          <div>
            <p><b>Private</b> document storage, use this feature to keep all those important documents safe and in one place.</p>
            <div className="upload-dialog">
              <div className="nopadding">
                <label htmlFor="document" className={`upload ${searchPanel ? 'active' : ''}`}>Upload Document</label>
                <input
                  type="file"
                  className="file"
                  id="document"
                  onChange={handleDocumentUpload}
                  multiple
                />
              </div>
              <ProgressBar now={parseInt(uploadDocumentProgress, 10) || 0} label={`${parseInt(uploadDocumentProgress, 10) || 0}%`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`searchPanel ${searchPanel ? 'expanded' : 'collapsed'}`}>
        <Form className="properties-search-form container" onSubmit={searchDocuments}>
          <FormGroup>
            <ControlLabel>
              Search Keyword
              <FormControl
                type="text"
                name="search"
                value={searchValue || ''}
                onChange={setSearchValues}
                placeholder="Enter search phrase..."
              />
            </ControlLabel>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="primary" type="submit">Search</Button>
          </FormGroup>
          <FormGroup>
            <Button bsStyle="warning" type="reset" onClick={handleSearchReset}>Reset</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
    <div className="contacts-content list">
      <Row className="table-row table-header">
        <Col md={2}>
          <div className="column">Created</div>
        </Col>
        <Col md={2}>
          <div className="column">Assigned to</div>
        </Col>
        <Col md={7}>
          <div className="column">Details</div>
        </Col>
      </Row>
      {!documents || documents.length === 0 ? <NoDataFound /> :
        documents.map((document, index) => (
          <Document
            key={document.id}
            index={index}
            document={document}
            user={user}
            deleteDocument={setDeleteDocument}
            downloadDocument={handleDocumentDownload}
            setDocument={setDocument}
          />
        )
      )}
    </div>
    {pagination && (
      <Pagination pagination={pagination} route={juvo.documents.pageLink} />
    )}
  </Grid>
);

export default DocumentsComponent;
