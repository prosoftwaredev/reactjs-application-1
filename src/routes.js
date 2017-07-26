import React from 'react';
import { Route, IndexRoute } from 'react-router';
import juvo from 'juvo';
import Login from 'containers/Auth/Login';
import ForgotPassword from 'containers/Auth/ForgotPassword';
import Register from 'containers/Auth/Register';
import ResetPassword from 'containers/Auth/ResetPassword';
import JuvoApp from 'containers/Juvo';
import App from 'containers/App';
import Billing from 'containers/Billing';
import Contacts from 'containers/App/Contacts';
import ContactInfo from 'containers/App/Contacts/ContactInfo';
import ContactCreate from 'containers/App/Contacts/ContactCreate';
import ContactsImport from 'containers/App/Contacts/ContactsImport';
import Dashboard from 'containers/App/Dashboard';
import Diary from 'containers/App/Diary';
import AddAppointment from 'containers/App/Diary/AddAppointment';
import EditAppointment from 'containers/App/Diary/EditAppointment';
import Documents from 'containers/App/Documents';
import Landlords from 'containers/App/Tenancies/Landlords';
import LandlordStatements from 'containers/App/Tenancies/LandlordStatements';
import Managements from 'containers/App/Managements';
import Offers from 'containers/App/Offers';
import OfferCreate from 'containers/App/Offers/OfferCreate';
import OfferInfo from 'containers/App/Offers/OfferInfo';
import Tenancies from 'containers/App/Tenancies';
import TenancyCreate from 'containers/App/Tenancies/TenancyCreate';
import TenancyInfo from 'containers/App/Tenancies/TenancyInfo';
import Plugins from 'containers/App/Plugins';
import Properties from 'containers/App/Properties';
import PropertyCreate from 'containers/App/Properties/PropertyCreate';
import PropertyInfo from 'containers/App/Properties/PropertyInfo';
import PropertyAssetsImages from 'containers/App/Properties/assets/Images';
import PropertyAssetsFloorplans from 'containers/App/Properties/assets/Floorplans';
import PropertyAssetsEPC from 'containers/App/Properties/assets/EPC';
import PropertyAssetsBrochures from 'containers/App/Properties/assets/Brochures';
import Rents from 'containers/App/Tenancies/Rents';
import ClientAccount from 'containers/App/Tenancies/ClientAccount';
import Support from 'containers/Support';
import Settings from 'containers/App/System/Settings';
import Templates from 'containers/App/System/Templates';
import EmailTemplates from 'containers/App/System/EmailTemplates';
import OptionsContainer from 'containers/App/System/Options';
import Options from 'containers/App/System/Options/Options';
import OptionsAppointments from 'containers/App/System/Options/Appointments';
import OptionsCountries from 'containers/App/System/Options/Countries';
import OptionsLocations from 'containers/App/System/Options/Locations';
import OptionsNotes from 'containers/App/System/Options/Notes';
import OptionsProperties from 'containers/App/System/Options/Properties';
import OptionsSources from 'containers/App/System/Options/Sources';
import User from 'containers/User';
import UserEdit from 'containers/User/UserEdit';
import MyProfile from 'containers/User/MyProfile';
import EmailSMS from 'containers/EmailSMS';
import NotFound from 'containers/NotFound';
import { fetchProperties, clearProperty, setDetailedProperty } from 'redux/modules/app/properties';
import { fetchDocuments } from 'redux/modules/app/documents';
import { showCardModal } from 'redux/modules/billing';
import { fetchContacts, clearContact, getContactInfo } from 'redux/modules/app/contacts';
import { getUserInfo, clearUser } from 'redux/modules/user';
import { clearData, setUserInfo, setError, clearError } from 'redux/modules/auth';
import { clearAppointment, setAppointment } from 'redux/modules/app/diary';
import { userInfo, signOut } from 'redux/modules/auth/requests';
import { getOfferInfo, clearOfferInfo } from 'redux/modules/app/offers';
import {
  getTenancyInfo,
  clearTenancyInfo,
  getTenancyRents,
  handleModalClose,
  getLandlordsDue,
  getTenancyClient,
  getTenancyStatements,
  getTenancyStatementTemplate,
} from 'redux/modules/app/tenancies';
import { getManagements, getUsers, setManagementData } from 'redux/modules/common';
import { clearPlugins } from 'redux/modules/app/plugins';
import { getBundles } from 'redux/modules/emailsms';

const mangementCategories = {
  diary: 1,
  contacts: 2,
  properties: 3,
  tenancy: 4,
  offers: 5,
};

export default (store) => {
  const appointmentOnLoad = (nextState, replace, callback) => {
    store.dispatch(setAppointment(nextState.params.id));
    callback();
  };
  const addAppointment = (nextState, replace, callback) => {
    store.dispatch(clearAppointment());
    callback();
  };
  const setBillingCard = (nextState, replace, callback) => {
    store.dispatch(showCardModal());
    callback();
  };
  const contactsOnLoad = (nextState, replace, callback) => {
    const page = (nextState.params && nextState.params.id) || 1;
    store.dispatch(fetchContacts(page));
    callback();
  };
  const documentsOnLoad = (nextState, replace, callback) => {
    const page = (nextState.params && nextState.params.id) || 1;
    console.log(page);
    store.dispatch(fetchDocuments(page));
    callback();
  };
  const emailSMSOnLoad = (nextState, replace, callback) => {
    store.dispatch(getBundles());
    callback();
  };
  const clientsOnLoad = (nextState, replace, callback) => {
    store.dispatch(handleModalClose());
    const page = (nextState.params && nextState.params.id) || 1;
    store.dispatch(getTenancyClient({ page }));
    const state = store.getState().common;
    if (!state.users || !state.users.length) {
      store.dispatch(getUsers());
    }
    callback();
  };
  const rentsOnLoad = (nextState, replace, callback) => {
    store.dispatch(handleModalClose());
    const page = (nextState.params && nextState.params.id) || 1;
    store.dispatch(getTenancyRents({ page, overdue: 1 }));
    const state = store.getState().common;
    if (!state.users || !state.users.length) {
      store.dispatch(getUsers());
    }
    callback();
  };
  const landlordsOnLoad = (nextState, replace, callback) => {
    store.dispatch(handleModalClose());
    const page = (nextState.params && nextState.params.id) || 1;
    store.dispatch(getLandlordsDue({ page }));
    const state = store.getState().common;
    if (!state.users || !state.users.length) {
      store.dispatch(getUsers());
    }
    callback();
  };
  const managementsOnLoad = (nextState, replace, callback) => {
    const page = (nextState.params && nextState.params.id) || 1;
    const category = mangementCategories[nextState.params.category];
    const state = {...store.getState().common};
    if (!state.users || !state.users.length) {
      store.dispatch(getUsers());
    }
    if (!state.managementData) {
      store.dispatch(setManagementData({ category }));
    }
    store.dispatch(getManagements({ page, category_id: category, overdue: 1 }));
    callback();
  };
  const propertiesOnLoad = (nextState, replace, callback) => {
    console.log(nextState.params.id);
    const page = (nextState.params && nextState.params.id) || 1;
    store.dispatch(fetchProperties(page));
    callback();
  };
  const propertyOnLoad = (nextState, replace, callback) => {
    console.log('propertyOnLoad');
    const id = nextState.params && nextState.params.id;
    store.dispatch(setDetailedProperty(id));
    callback();
  };
  const clearForgotData = (nextState, replace, callback) => {
    store.dispatch(clearData());
    callback();
  };
  const contactOnLoad = (nextState, replace, callback) => {
    const id = nextState.params && nextState.params.id;
    store.dispatch(getContactInfo(id));
    callback();
  };
  const createProperty = (nextState, replace, callback) => {
    store.dispatch(clearProperty());
    callback();
  };
  const createContact = (nextState, replace, callback) => {
    store.dispatch(clearContact());
    callback();
  };
  const createUser = (nextState, replace, callback) => {
    store.dispatch(clearUser());
    callback();
  };
  const setProfile = (nextState, replace, callback) => {
    console.log('setProfile');
    store.dispatch(getUserInfo(store.getState().auth.identity.id));
    callback();
  };
  const clearLocalData = (nextState, replace, callback) => {
    signOut().catch(err => console.log(err));
    localStorage.removeItem('ukey');
    localStorage.removeItem('uid');
    store.dispatch(clearError());
    callback();
  };
  const loadUser = (nextState, replace, callback) => {
    store.dispatch(getUserInfo(nextState.params && nextState.params.id));
    callback();
  };
  const loadOfferInfo = (nextState, replace, callback) => {
    store.dispatch(getOfferInfo(nextState.params && nextState.params.id));
    callback();
  };
  const clearOffer = (nextState, replace, callback) => {
    store.dispatch(clearOfferInfo());
    callback();
  };
  const loadTenancyInfo = (nextState, replace, callback) => {
    store.dispatch(getTenancyInfo(nextState.params && nextState.params.id));
    callback();
  };
  const clearTenancy = (nextState, replace, callback) => {
    store.dispatch(clearTenancyInfo());
    callback();
  };
  const landlordStatementsOnLoad = (nextState, replace, callback) => {
    const data = {
      tenancy_id: nextState.params.id,
      tenancy_rent_due_id: nextState.params.rentId,
    };
    store.dispatch(getTenancyInfo(nextState.params.id));
    store.dispatch(getTenancyStatements(data));
    store.dispatch(getTenancyStatementTemplate());
    callback();
  };
  const pluginsOnLeave = () => {
    store.dispatch(clearPlugins());
  };
  const requireAuth = (nextState, replace, callback) => {
    const ukey = localStorage.getItem('ukey');
    const uid = localStorage.getItem('uid');
    if (!ukey || !uid) {
      replace({
        pathname: juvo.signIn.index,
        state: { nextPathname: nextState.location.pathname },
      });
      callback();
    } else {
      userInfo(uid, ukey)
        .then(({data}) => {
          if (data) {
            store.dispatch(setUserInfo(data));
            callback();
          }
        })
        .catch((error) => {
          console.log(error);
          store.dispatch(setError(null));
          replace({
            pathname: juvo.signIn.index,
            state: { nextPathname: nextState.location.pathname },
          });
          callback();
        });
    }
  };
  return (
    <Route component={JuvoApp}>
      <Route path={juvo.index} component={App} onEnter={requireAuth}>
        <IndexRoute component={Dashboard} />
        <Route path={juvo.billing.index} component={Billing} />
        <Route path={juvo.billing.error} component={Billing} onEnter={setBillingCard} />
        <Route path={juvo.billing.card} component={Billing} onEnter={setBillingCard} />
        <Route path={juvo.contacts.index} component={Contacts} onEnter={contactsOnLoad} />
        <Route path={juvo.contacts.pageRoute} component={Contacts} onEnter={contactsOnLoad} />
        <Route path={juvo.contacts.create} component={ContactCreate} onEnter={createContact} />
        <Route path={juvo.contacts.importFile} component={ContactsImport} />
        <Route path={juvo.contacts.infoRoute} component={ContactInfo} onEnter={contactOnLoad} />
        <Route path={juvo.dashboard.index} component={Dashboard} />
        <Route path={juvo.diary.index} component={Diary} />
        <Route path={juvo.diary.create} component={AddAppointment} onEnter={addAppointment} />
        <Route path={juvo.diary.infoRoute} component={EditAppointment} onEnter={appointmentOnLoad} />
        <Route path={juvo.documents.index} component={Documents} onEnter={documentsOnLoad} />
        <Route path={juvo.documents.pageRoute} component={Documents} onEnter={documentsOnLoad} />
        <Route path={juvo.emailsms.index} component={EmailSMS} onEnter={emailSMSOnLoad} />
        <Route path={juvo.properties.index} component={Properties} onEnter={propertiesOnLoad} />
        <Route path={juvo.properties.pageRoute} component={Properties} onEnter={propertiesOnLoad} />
        <Route path={juvo.properties.create} component={PropertyCreate} onEnter={createProperty} />
        <Route path={juvo.properties.infoRoute} component={PropertyInfo} onEnter={propertyOnLoad} >
          <IndexRoute component={PropertyAssetsImages} />
          <Route path={juvo.properties.assets.imagesRoute} component={PropertyAssetsImages} />
          <Route path={juvo.properties.assets.floorplansRoute} component={PropertyAssetsFloorplans} />
          <Route path={juvo.properties.assets.epcRoute} component={PropertyAssetsEPC} />
          <Route path={juvo.properties.assets.brochuresRoute} component={PropertyAssetsBrochures} />
        </Route>
        <Route path={juvo.offers.index} component={Offers} />
        <Route path={juvo.offers.create} component={OfferCreate} onEnter={clearOffer} />
        <Route path={juvo.offers.infoRoute} component={OfferInfo} onEnter={loadOfferInfo} />
        <Route path={juvo.tenancies.index} component={Tenancies} />
        <Route path={juvo.tenancies.create} component={TenancyCreate} onEnter={clearTenancy} />
        <Route path={juvo.tenancies.client.index} component={ClientAccount} onEnter={clientsOnLoad} />
        <Route path={juvo.tenancies.client.pageRoute} component={ClientAccount} onEnter={clientsOnLoad} />
        <Route path={juvo.tenancies.rents.index} component={Rents} onEnter={rentsOnLoad} />
        <Route path={juvo.tenancies.rents.pageRoute} component={Rents} onEnter={rentsOnLoad} />
        <Route path={juvo.tenancies.rents.index} component={Rents} onEnter={rentsOnLoad} />
        <Route path={juvo.tenancies.rents.pageRoute} component={Rents} onEnter={rentsOnLoad} />
        <Route path={juvo.tenancies.landlords.index} component={Landlords} onEnter={landlordsOnLoad} />
        <Route path={juvo.tenancies.landlords.pageRoute} component={Landlords} onEnter={landlordsOnLoad} />
        <Route path={juvo.tenancies.landlords.statementsRoute} component={LandlordStatements} onEnter={landlordStatementsOnLoad} />
        <Route path={juvo.tenancies.infoRoute} component={TenancyInfo} onEnter={loadTenancyInfo} />
        <Route path={juvo.plugins.index} component={Plugins} onLeave={pluginsOnLeave} />
        <Route path={juvo.support.index} component={Support} />
        <Route path={juvo.settings.index} component={Settings} />
        <Route path={juvo.emailtemplates.index} component={EmailTemplates} />
        <Route path={juvo.templates.index} component={Templates} />
        <Route path={juvo.options.index} component={OptionsContainer}>
          <IndexRoute component={Options} />
          <Route path={juvo.options.appointmentsRoute} component={OptionsAppointments} />
          <Route path={juvo.options.countriesRoute} component={OptionsCountries} />
          <Route path={juvo.options.locationsRoute} component={OptionsLocations} />
          <Route path={juvo.options.notesRoute} component={OptionsNotes} />
          <Route path={juvo.options.propertiesRoute} component={OptionsProperties} />
          <Route path={juvo.options.sourcesRoute} component={OptionsSources} />
        </Route>
        <Route path={juvo.user.index} component={User} />
        <Route path={juvo.user.profile} component={MyProfile} onEnter={setProfile} />
        <Route path={juvo.user.create} component={UserEdit} onEnter={createUser} />
        <Route path={juvo.user.infoRoute} component={UserEdit} onEnter={loadUser} />
        <Route path={juvo.managements.index} component={Managements} onEnter={managementsOnLoad} />
        <Route path={juvo.managements.pageRoute} component={Managements} onEnter={managementsOnLoad} />
      </Route>
      <Route path={juvo.forgot.index} component={ForgotPassword} onEnter={clearForgotData} />
      <Route path={juvo.signIn.index} component={Login} onEnter={clearLocalData} onChange={clearLocalData} />
      <Route path={juvo.signIn.login} component={Login} onEnter={clearLocalData} onChange={clearLocalData} />
      <Route path={juvo.signUp.index} component={Register} />
      <Route path={juvo.reset.index} component={ResetPassword} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};
