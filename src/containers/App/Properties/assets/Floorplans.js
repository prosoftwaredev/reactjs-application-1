import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Container from 'components/App/Properties/Container';
import SortableList from 'components/App/Properties/SortableList';
import { setOrderAssets, setDeletedAsset, setAssetsOrder } from 'redux/modules/app/properties';

const Floorplans = (props) => {
  const assets = props.assets && props.assets.length ? [...props.assets].filter(asset => asset.type_id === 2) : [];
  return (
    <SortableList
      assets={assets}
      setDeletedAsset={props.setDeletedAsset}
      setAssetsOrder={props.setAssetsOrder}
    />
  );
  // return (
  //   <Container
  //     assets={assets}
  //     onDrop={props.setOrderAssets}
  //     onDeleteAsset={props.setDeletedAsset}
  //   />
  // );
};

const mapStateToProps = state => ({
  assets: state.app.properties.assets,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setOrderAssets,
    setDeletedAsset,
    setAssetsOrder,
    dispatch,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Floorplans);
