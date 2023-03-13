import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { notificationCount, setNotificationCount } from '../../utils/redux/reducer/authentication-slice';
// import { getNotificationCount } from '../../actions';
import { ApiUrls } from './ApiUrls';
import './notification.scss';
import NotificationInfo from './NotificationInfo';

const NotificationWrapper = ({ color }) => {
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(20);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const notification = useSelector(notificationCount);
  const geNotification = async (toggleValue, unReadValue, pageSize) => {
    const sendData = {
      page: 1,
      size: pageSize > 10 ? pageSize : 10,
      filter: [],
      sort: ['createdAt:desc'],
      graphql: null,
    };
    try {
      setLoading(true);
      const { status, data } = await axiosInstance.post(ApiUrls.getNotifications(unReadValue), sendData);
      if (status === 200) {
        setTotalElements(data?.totalElements);
        setLoading(false);
        setNotifications(data?.content);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const openNotificationPop = (toggleValue, unreadValue, pageSize) => {
    dispatch(setNotificationCount(0));
    geNotification(toggleValue, unreadValue, pageSize);
  };

  const handleMarkAsUnreadToggleNotification = async (toggleValue, unReadValue, id, pageSize, notificationFlag) => {
    try {
      const { status } = await axiosInstance.put(ApiUrls.readUnReadNotification(id, notificationFlag));
      if (status === 200) {
        geNotification(toggleValue, unReadValue, pageSize);
      }
    } catch (e) {
      // console.log(e)
    }
  };

  const handleAllReadNotification = async (toggleValue, unReadValue, pageSize) => {
    try {
      const { status } = await axiosInstance.put(ApiUrls.marAsAllReadNotification, {});
      if (status === 200) {
        geNotification(toggleValue, unReadValue, pageSize);
      }
    } catch (e) {
      // console.log(e)
    }
  };
  return (
    <div>
      <NotificationInfo
        size={pageSize}
        notificationHeaderText="Notification"
        emptyNotificationMessage="No Notifications"
        notificationConfigureDayMessage="That's all your notifications from the last 30 days."
        totalElements={totalElements}
        count={notification}
        handleAllReadNotification={handleAllReadNotification}
        handleMarkAsUnreadToggleNotification={handleMarkAsUnreadToggleNotification}
        options={notifications}
        getAllNotification={openNotificationPop}
        color={color}
      />
    </div>
  );
};

export default NotificationWrapper;
