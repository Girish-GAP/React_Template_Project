import { routes } from "../../utils/constants/routes";
import {
  ManageAccounts,
  People,
  Person4Outlined,
  Settings,
} from "@mui/icons-material";

import { privileges } from "../../utils/constants/privileges";

import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { 
  SourceOutlined,
  ConfirmationNumberOutlined,
  CategoryOutlined,
  BugReportOutlined,
AssignmentOutlined,
EditAttributesOutlined,
AttributionOutlined,
SubtitlesOutlined
 }from "@mui/icons-material";


 // this is the array of privilages 
 // we are going to map as per privilages from backend
const config = (IsPrivilege: any, strings: any) => {
  return[

  // used ternary operator, if IsPrivliage is true then return json other wise ""
  IsPrivilege?.includes(privileges.view_user)
  ? {
      key: "1",
      name: strings.menu_text_dashboard,
      route: routes.dashboard,
      icon: GridViewOutlinedIcon,
    }
  : "",
  IsPrivilege?.includes(privileges.view_user)
    ? {
        key: "2",
        name: strings.menu_text_usermgmt,
        // route: routes.users,
        route : "/add",        // GIRI
        icon: People,
      }
    : "",
  IsPrivilege?.includes(privileges.view_role)
    ? {
        key: "3",
        name: strings.menu_text_roles,
        route: routes.roleList,
        icon: ManageAccounts,
      }
    : "",
  IsPrivilege?.includes(privileges.view_ticket)
    ? {
        key: "34",
        name: strings.menu_text_my_tickets,
        route: routes.ticket,
        icon: ConfirmationNumberOutlinedIcon,
      }
    : "",
  IsPrivilege?.includes(privileges.view_ticket)
    ? {
        key: "15",
        name: strings.menu_text_tickets,
        route: routes.newTicket,
        icon: ControlPointOutlinedIcon,
      }
    : "",
  // the key 7 will be render always : 
  {   
    key: "7",
    name: "Admin Screen",
    icon: Settings,
    // route: routes.dashboard,  ///Giri // not done in tickit added to solve error...// while maping its doing menu.route of all items so added
    children: [
      IsPrivilege?.includes(privileges.view_agent)
        ? {
        key: "4",
        name: strings.menu_text_agents,
        route: routes.agentList,
        icon: Person4Outlined,
      }:'',
      IsPrivilege?.includes(privileges.view_ticket_source)
        ? {
            key: "8",
            name: strings.menu_text_ticket_source,
            route: routes.ticketSource,
            icon: SourceOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_ticket_sub_source)
        ? {
            key: "9",
            name: strings.menu_text_ticket_sub_source,
            route: routes.ticketSubSource,
            icon: SubtitlesOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_key_attribute)
        ? {
            key: "14",
            name: strings.menu_text_key_attributes,
            route: routes.keyAttributes,
            icon: EditAttributesOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_child_attribute)
        ? {
            key: "15",
            name: strings.menu_text_child_attributes,
            route: routes.childAttributes,
            icon: AttributionOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_ticket_status)
        ? {
            key: "17",
            name: strings.menu_text_ticket_status,
            route: routes.ticketStatus,
            icon: Person4Outlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_assign_group)
        ? {
            key: "16",
            name: strings.menu_text_assign_groups,
            route: routes.assignGroups,
            icon: AssignmentOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_ticket_category)
        ? {
            key: "10",
            name: strings.menu_text_ticket_categories,
            route: routes.ticketCategories,
            icon: CategoryOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_ticket_sub_category)
        ? {
            key: "11",
            name: strings.menu_text_ticket_sub_categories,
            route: routes.ticketSubCategories,
            icon: CategoryOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_issue_type)
        ? {
            key: "12",
            name: strings.menu_text_issue_types,
            route: routes.issueTypes,
            icon: BugReportOutlined,
          }
        : "",
      IsPrivilege?.includes(privileges.view_ticket_type)
        ? {
            key: "13",
            name: strings.menu_text_ticket_types,
            route: routes.ticketTypes,
            icon: ConfirmationNumberOutlined,
          }
        : "",
    ],
  },
];}

export default config;
