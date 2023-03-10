export const URLS = {
  login: "/oauth/token",
  logout: "/authenticated/user/logout",
  forgot: "/api/users/password/forgot",
  verify: "/api/users/verify-code",
  resend: "/api/users/resend-code",
  reset: "/api/users/password",
  verifyCode: "/api/users/currentUser/mail/code/verification",
  resendCode: "/api/users/resend-code",
  resetPassword: "/authenticated/users/current-user/password",
  refresh_token: "/api/refresh-token",
  tarnslation: (language: string) => `/api/translations/${language}`,

  // profile
  companyCredit: "/authenticated/user/company-credits",
  language: "/api/languages",
  countries: "/authenticated/countries",
  states: (id: number) => `/authenticated/countries/${id}/states`,
  cities: (id: number) => `/authenticated/states/${id}/cities`,
  userProfile: "/authenticated/user/profile",
  editUserProfile: "/authenticated/users/update-profile",
  editProfileById: (id: string) => `/authenticated/user/profile/${id}`,

  // role
  role: "/authenticated/roles/page",
  roles: "/authenticated/roles",
  addRole: "/authenticated/roles",
  editRole: (id: string) => `/authenticated/roles/${id}`,
  deleteRole: (id: string) => `/authenticated/roles/${id}`,
  updatePriviliges: (id: string) => `authenticated/roles/${id}/privileges`,

  // user management
  users: "/authenticated/users/page",
  addUser: "/authenticated/user",
  getUserById: (id: string) => `/authenticated/user/${id}`,
  editUserById: (id: string) => `/authenticated/user/${id}`,
  deleteUserById: (id: string) => `/authenticated/user/${id}`,
  resetUser: (id: number) => `/authenticated/user/${id}/reset-password`,
  toggleUser: (id: number) => `/authenticated/user/${id}/toggle`,

  // agent
  agents: "/authenticated/agents/page",
  addAgent: "/authenticated/agents",
  editAgent: (id: string) => `/authenticated/agents/${id}`,
  deleteAgent: (id: string) => `/authenticated/agents/${id}`,

  // ticketSource
  get_edit_delete_ticket_source: (id: number) =>
    `/authenticated/ticket-source/${id}`,
  addTicketSource: `/authenticated/ticket-source`,
  ticketSource: `/authenticated/ticket-source/page`,
  tickets: "/authenticated/tickets",
  get_edit_delete_ticket: (id: number) => `/authenticated/tickets/${id}`,
  add_ticket: `/authenticated/tickets/page`,
  ticket: `/authenticated/tickets`,
  ticket_dropdown_sources: "/authenticated/ticket-sources",
  ticket_dropdown_child_attributes: "/authenticated/child-attributes",
  ticket_dropdown_agents: "/authenticated/agents",
  ticket_dropdown_key_attributes: "/authenticated/key-attributes",
  ticket_dropdown_ticket_types: "/authenticated/ticket-types",
  ticket_dropdown_issue_types: "/authenticated/issue-types",
  ticket_dropdown_ticket_sub_categories: "/authenticated/ticket-sub-categories",
  ticket_dropdown_ticket_categories: "/authenticated/ticket-categories",
  ticket_dropdown_user_types: "/authenticated/user-types",
  ticket_dropdown_sub_sources: "/authenticated/ticket-sub-sources",
  ticket_dropdown_assign_group: "/authenticated/assign-groups",
  ticket_dropdown_ticket_status: "/authenticated/ticket-status",

  // ticketSubSource
  get_edit_delete_ticket_sub_source: (id: number) =>
    `/authenticated/ticket-sub-source/${id}`,
  addTicketSubSource: `/authenticated/ticket-sub-source`,
  ticketSubSource: `/authenticated/ticket-sub-source/page`,

  // keyAttributes
  get_edit_delete_key_attributes: (id: number) =>
    `/authenticated/key-attributes/${id}`,
  addKeyAttributes: `/authenticated/key-attributes`,
  keyAttributes: `/authenticated/key-attributes/page`,

  // childAttributes
  get_edit_delete_child_attributes: (id: number) =>
    `/authenticated/child-attributes/${id}`,
  addChildAttributes: `/authenticated/child-attributes`,
  childAttributes: `/authenticated/child-attributes/page`,

  // assignGroups
  get_edit_delete_assign_groups: (id: number) =>
    `/authenticated/assign-groups/${id}`,
  addAssignGroups: `/authenticated/assign-groups`,
  assignGroups: `/authenticated/assign-groups/page`,
  // ticketCategories
  get_edit_delete_ticket_categories: (id: number) =>
    `/authenticated/ticket-categories/${id}`,
  addTicketCategories: `/authenticated/ticket-categories`,
  ticketCategories: `/authenticated/ticket-categories/page`,

  // ticketSubCategories
  get_edit_delete_ticket_sub_categories: (id: number) =>
    `/authenticated/ticket-sub-categories/${id}`,
  addTicketSubCategories: `/authenticated/ticket-sub-categories`,
  ticketSubCategories: `/authenticated/ticket-sub-categories/page`,

  // IssueTypes
  get_edit_delete_issue_types: (id: number) =>
    `/authenticated/issue-types/${id}`,
  addIssueTypes: `/authenticated/issue-types`,
  IssueTypes: `/authenticated/issue-types/page`,

  // TicketTypes
  get_edit_delete_ticket_types: (id: number) =>
    `/authenticated/ticket-types/${id}`,
  addTicketTypes: `/authenticated/ticket-types`,
  TicketTypes: `/authenticated/ticket-types/page`,
  tickets_notes: (id: number) => `/authenticated/tickets/${id}/notes`,
  dashboard: "/authenticated/dashboard",
  ticketStatus: "/authenticated/ticketStatus",

  // TicketStatus
  get_edit_delete_ticket_status: (id: number) =>
    `/authenticated/ticket-status/${id}`,
  addTicketStatus: `/authenticated/ticket-status`,
  TicketStatus: `/authenticated/ticket-status/page`,
};
