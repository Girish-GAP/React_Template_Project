export const ApiUrls = {
  getNotifications: unReadFilter => `/authenticated/notifications/page?showUnread=${unReadFilter}`,
  readUnReadNotification: (id, notificationFlag) => `/authenticated/notifications/${id}?markAsRead=${notificationFlag}`,
  marAsAllReadNotification: `/authenticated/notifications/mark-as-read`,
};
