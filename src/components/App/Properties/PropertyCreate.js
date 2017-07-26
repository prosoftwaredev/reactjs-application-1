import React from 'react';
import { Grid, Panel } from 'react-bootstrap';
import MainForm from './MainForm';

const PropertyCreateComponent = ({
  error,
  user,
  property,
  types,
  prices,
  statuses,
  categories,
  loading,
  mainFormSubmit,
  mainFormChange,
  mainFormDateChange,
  owners,
  handleOwnerChange,
  handleOwnerSelect,
  addNewContact,
  newContact,
  quickCreateContact,
  fillAddress,
  assetsType,
  handleAssetTypeChange,
  handleAssetsUpload,
  changeDescription,
  toggleInlineStyle,
  toggleBlockType,
  description,
}) => (
  <Grid fluid className="properties-page create">
    <Panel>
      <h2 className="page-header">Create Property</h2>
      <MainForm
        error={error}
        user={user}
        values={property || {}}
        types={types}
        prices={prices}
        statuses={statuses}
        categories={categories}
        loading={loading}
        onSubmit={mainFormSubmit}
        onChange={mainFormChange}
        onDateChange={mainFormDateChange}
        owners={owners}
        handleOwnerChange={handleOwnerChange}
        handleOwnerSelect={handleOwnerSelect}
        addNewContact={addNewContact}
        newContact={newContact}
        quickCreateContact={quickCreateContact}
        fillAddress={fillAddress}
        assetsType={assetsType}
        handleAssetTypeChange={handleAssetTypeChange}
        handleAssetsUpload={handleAssetsUpload}
        changeDescription={changeDescription}
        toggleInlineStyle={toggleInlineStyle}
        toggleBlockType={toggleBlockType}
        description={description}
      />
    </Panel>
  </Grid>
);

PropertyCreateComponent.propTypes = {
  user: React.PropTypes.object,
  types: React.PropTypes.array,
  prices: React.PropTypes.array,
  statuses: React.PropTypes.array,
  categories: React.PropTypes.array,
  loading: React.PropTypes.object,
  owners: React.PropTypes.array,
  mainFormSubmit: React.PropTypes.func.isRequired,
  mainFormChange: React.PropTypes.func.isRequired,
  mainFormDateChange: React.PropTypes.func.isRequired,
  handleOwnerChange: React.PropTypes.func.isRequired,
  handleOwnerSelect: React.PropTypes.func.isRequired,
};

export default PropertyCreateComponent;
