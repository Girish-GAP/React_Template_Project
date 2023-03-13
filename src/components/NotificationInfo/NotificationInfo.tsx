/* eslint-disable jsx-a11y/anchor-is-valid */
import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Toggle from '../Toggle/Toggle';
import RelativeTime from 'dayjs/plugin/relativeTime';
import './notification.scss';
import { Badge, IconButton, Stack, Typography, useTheme } from '@mui/material';
dayjs.extend(RelativeTime);
declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string
  }
}
type NotificationProps = {
  handleMarkAsUnreadToggleNotification: (toggle: boolean, unReadValue: boolean, id: number, pageSize: number | undefined, value: boolean) => void;
  getAllNotification: (toggle: any, unReadValue: any, pageSize: any) => void;
  handleAllReadNotification: (toggle: boolean, unReadValue: any) => void;
  disabled?: boolean;
  children: React.ReactNode | string;
  variant?: any;
  className?: string;
  fullWidth?: boolean;
  title?: string;
  sx?: Object;
  type?: any;
  count?: any;
  options?: any;
  size?: number;
  totalElements?: number | undefined | any;
  notificationConfigureDayMessage: string;
  emptyNotificationMessage: string;
  notificationHeaderText: string;
  classes?: string
  color?: string
};
const NotificationInfo: FC<NotificationProps> = ({
  classes,
  count,
  options,
  getAllNotification,
  handleMarkAsUnreadToggleNotification,
  handleAllReadNotification,
  notificationConfigureDayMessage,
  totalElements,
  emptyNotificationMessage,
  notificationHeaderText,
  size,
  color,
}) => {
  const theme = useTheme();
  const notificationRef = useRef() as any;
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [unReadValue, setReadValue] = useState(false);
  const [pageSize, setPageSize] = useState(size);
  // const data = [{ markAsRead: false, description: 'Dummy text', notificationText: 'new Notifications,', createdAt: '22-03-2022' }]
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (pageSize && size && pageSize > size) {
      getAllNotification(toggle, unReadValue, pageSize);
    }
  }, [getAllNotification, pageSize, size, toggle, unReadValue]);

  const handleClickOutside = (e: any) => {
    if (!notificationRef.current && notificationRef.current?.contains(e.target)) {
      setToggle(false);
    }
  };

  const handleScroll = (event: any) => {
    const e = event.nativeEvent;
    if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
      setPageSize((prevState: any) => (prevState && prevState >= totalElements ? totalElements : prevState + size));
    }
  };

  const handleAllRead = () => {
    handleAllReadNotification(toggle, unReadValue);
  };

  const ReadToggle = (id: number, notificationFlag: boolean) => {
    handleMarkAsUnreadToggleNotification(toggle, unReadValue, id, pageSize, notificationFlag);
  };

  const getAndOpenNotifications = () => {
    setToggle(!toggle);
    if (!toggle) {
      getAllNotification(toggle, unReadValue, pageSize);
    }
  };

  const getOnlyUnReadNotification = (allUnreadFlag: any) => {
    setReadValue(allUnreadFlag);
    getAllNotification(toggle, allUnreadFlag, pageSize);
  };

  const isMarkAsAllRead = options ? options?.filter((item: any) => item.markAsRead === false) : false;

  const markAsReadAndRedirect = async (e: any, url: string, id: number) => {
    e.preventDefault();
    try {
      await handleMarkAsUnreadToggleNotification(toggle, unReadValue, id, pageSize, true);
      setToggle(false);
      Navigate(url);
    } catch (e) { }
  };

  return (
    <Stack sx={{ fontFamily: theme.typography.fontFamily }}>
      <div className="btn-group notificationWrapper" ref={notificationRef}>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded="false"
          // data-toggle="dropdown"
          title="Notifications"
          className={`dropdown-toggle mb-0  btn btn-link min-width-auto position-relative notificationBtn ${classes}`}
          onClick={getAndOpenNotifications}>
          {count > 0 ? <Badge badgeContent={count} color="error">
            <IconButton aria-label="delete">
              <NotificationsNoneIcon color="action" />
            </IconButton>
          </Badge> :
            <IconButton  aria-label="delete">
              <NotificationsNoneIcon />
            </IconButton>}
        </button>
        <div>
          <ul onScroll={handleScroll} className={`pt-3 pb-3 dropdown-menu dropdown-menu-right ${toggle ? 'isShow' : 'hide'}`}>
            <li className="pl-3 pr-3 d-flex justify-content-between">
              <Typography variant='h6' className="mb-3 fw-500">{notificationHeaderText}</Typography>
              <Toggle toggleTitle="Only show unread" clickCallback={getOnlyUnReadNotification} />
            </li>
            {Object.keys(isMarkAsAllRead).length > 0 && (
              <li className="text-right pr-3">
                <span className="allRead" onClick={handleAllRead}>
                  Mark all as read
                </span>
              </li>
            )}
            {options && Object.keys(options).length > 0 ? (
              <>
                {options?.map((item: any, i: number) => (
                  <li
                    key={i}
                    className={`pl-3 pr-3 top-text-block d-flex justify-content-between align-items-center ${!item?.markAsRead &&
                      'unreadNotification'}`}>
                    {/* <span className="avatar">{item?.assignee.slice(0, 1)}</span> */}

                    <div className="leftSide">
                      <a
                        href="#"
                        onClick={e => {
                          markAsReadAndRedirect(e, item?.redirectUrl, item.id);
                        }}
                        className="">
                        <div className="top-text-heading fw-500">{item?.notificationText}</div>
                        <div className="description">{item?.description}</div>
                        <div className="top-text-light">
                          {item?.redirectUrl === null && (
                            <span className="taskCompletedText">
                              {item?.notificationType === 'TASK_CLAIMED' ? 'Task claimed' : 'Task completed'}
                            </span>
                          )}
                          {dayjs(item?.createdAt).fromNow()}
                        </div>
                      </a>
                    </div>
                    <div className="rightSide">
                      <button
                        type="button"
                        title={`${item?.markAsRead ? 'mark as unread' : 'mark as read'}`}
                        onClick={() => ReadToggle(item.id, !item?.markAsRead)}
                        className="btn btn-link">
                        <span className={`${item?.markAsRead ? '' : 'unreadIndicator'}`} />
                      </button>
                    </div>
                  </li>
                ))}
                {pageSize === totalElements && (
                  <li className="emptyNotificationFlag">
                    <div>
                      <i className="fa fa-flag-checkered" />
                    </div>
                    {notificationConfigureDayMessage}
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="p-3 justify-content-center d-flex align-items-center">
                  <h5>{emptyNotificationMessage}</h5>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Stack>
  );
};

export default NotificationInfo;


