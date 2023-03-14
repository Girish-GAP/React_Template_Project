import React, {
  FC,
  useMemo,
  useState,
  useRef,
  RefObject,
  useCallback,
} from "react";
import {
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TableFooter,
  Container,
  useTheme,
  Popover,
  TablePagination,
  Button,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import AddIcon from "@mui/icons-material/Add";
import { images } from "../../../utils/constants/images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Privilege } from "../../../utils/redux/reducer/authentication-slice";
import Delete from "./Delete";
import strings from "../../../common/Translation/Translate";
import "./styles.scss";
import { removeErrorFieldsFromValues } from "../../../utils/validators";
import Form, { FormDataModel } from "../../../components/Form";

export interface PageConfigModel {
  title: string;
  AddButtonText?: string;
  AddButtonUrl?: any;
  editButtonUrl?: string;
  listApi: string;
  deleteApi?: any | null;
  editPrivilege?: string;
  deletePrivilege?: string;
  blockUserPrivilege?: string;
  addPrivilege?: string | null;
  tableColumn: any[];
  dropdownData?: any[],
  customImage?: {
    imageUrl: string;
    buttonText?: string;
    privilege: string;
    handleCustomImageMethod: (id: number) => void;
  };
  toggleUser?: (id: number) => void;
  filterForm?: any;
}
interface ListPageProps {
  pageConfig: PageConfigModel;
  pageResponse: any;
  getList: any;
}
const ListPage: FC<ListPageProps> = ({ pageConfig, pageResponse, getList }) => {
  const Navigate = useNavigate();
  let filterRef: RefObject<Form | null | undefined> = useRef();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const IsPrivilege = useSelector(Privilege);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [index, setIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<any>([]);
  const deleteUser = async (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setIndex(newPage);
    const body = {
      page: newPage + 1,
      size: pageSize,
      filter: [],
      sort: [],
    };
    getList(body);
  };
  const deleteModal = useMemo(() => {
    return (
      <Delete
        updateList={() =>
          getList({
            page: index + 1,
            size: pageSize,
            filter: filter || [],
            sort: [],
          })
        }
        closeModal={closeModal}
        openModal={openModal}
        deleteUrl={
          pageConfig.deleteApi !== null && pageConfig.deleteApi(selectedId)
        }
      />
    );
  }, [filter, getList, index, openModal, pageConfig, pageSize, selectedId]);
  const handleFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const applyFilter = useCallback(
    async (reset: boolean) => {
      const filters: any = [];
      if (reset) {
        setFilter(null);
      } else {
        const { getFormData } = filterRef.current as {
          getFormData: () => { formData: FormDataModel; isFormValid: boolean };
        };
        const { formData } = getFormData();
        const filter_data = removeErrorFieldsFromValues(formData);
        setFilter(filter_data);
        Object.keys(filter_data).forEach((key) => {
          if (!!filter_data[key]) {
            // filters?.filter((item: any) => item !== null);
            if (filters.length > 0) {
              filters.push("and");
            }
            filters.push(
              filter_data[key] ? `${key}:cic:${filter_data[key]}` : null
            );
          }
        });
      }
      const newFilter = filters?.filter((item: any) => item !== null);
      const body = {
        page: 1,
        size: pageSize,
        filter: newFilter || [],
        sort: [],
      };
      await getList(body);
      handleCloseFilter();
    },
    [getList, pageSize]
  );
  const popover = useMemo(() => {
    return (
      <Box width={320}>
        <Grid container sx={{ m: 2, ml: 0, px: 2 }}>
          <Grid item xs={5}>
            <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
              {strings.filter_text}
            </Typography>
          </Grid>
          <Grid item xs={5} textAlign={"right"}>
            <Button
              variant={"outlined"}
              onClick={() => applyFilter(true)}
              sx={{ p: 1 }}
            >
              <Typography variant={"body2"}>{strings.clear_filter_text}</Typography>
            </Button>
          </Grid>
          <Grid item xs={2} textAlign={"right"}>
            <Button variant={"text"} onClick={handleCloseFilter}>
              <Close />
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, width: "calc(100% + 16px)" }} />
        <Grid container>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Form
              ref={filterRef as RefObject<Form>}
              model={pageConfig.filterForm}
              values={filter}
            />
            <Button
              variant="contained"
              sx={{ my: 2, color: "#ffffff" }}
              fullWidth
              onClick={() => applyFilter(false)}
            >
              {strings.continue_text}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }, [pageConfig.filterForm, filter, applyFilter]);
  const anchor_id = open ? "simple-popover" : undefined;
  return (
    <Container sx={{ p: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
            {pageConfig.title}
          </Typography>
        </Grid>
        <Grid justifyContent='end' item md={4} textAlign={"right"}>
          {pageConfig.filterForm && (
            <PrimaryButton sx={{ mr: 2 }} onClick={handleFilter} fullWidth={false}>
              <FilterAltOutlinedIcon />
              <Typography
                variant={"body1"}
                sx={{ pl: 1 }}
                fontWeight={"bold"}
              >
                {strings.filter_text}
              </Typography>
            </PrimaryButton>
          )}
          {IsPrivilege?.includes(pageConfig.addPrivilege) && (
            <PrimaryButton
              variant="contained"
              onClick={() => {
                Navigate(pageConfig.AddButtonUrl);
              }}
              sx={{ color: "#ffffff", width: "auto" }}
            >
              <AddIcon />
              {pageConfig.AddButtonText}
            </PrimaryButton>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1 }} />
      {pageConfig?.filterForm && (
        <Popover
          sx={{ m: 4, [`& .MuiPopover-paper`]: { borderRadius: 5 } }}
          id={anchor_id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {popover}
        </Popover>
      )}
      {pageResponse?.content?.length > 0 ? (
        <TableContainer>
          <Table
            sx={{
              borderSpacing: "0 1rem",
              borderCollapse: "separate",
            }}
          >
            <TableHead>
              <TableRow>
                {pageConfig.tableColumn.map((column: any, index: number) => (
                  <TableCell
                    key={index}
                    sx={{
                      borderTop: "none",
                      borderBottom: "none",
                      py: 0,
                      color: "#656565",
                    }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}

                <TableCell
                  sx={{
                    borderTop: "none",
                    borderBottom: "none",
                    py: 0,
                    color: "#656565",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  {strings.action_text}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageResponse?.content?.length > 0 &&
                pageResponse?.content?.map((item: any, indexValue: number) => (
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      verticalAlign: "top",
                    }}
                    key={indexValue}
                  >
                    {pageConfig.tableColumn.map((_header: any, i: number) => (
                      <TableCell key={i}>{item[_header["field"]]}</TableCell>
                    ))}
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        verticalAlign: "middle",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        {IsPrivilege?.includes(
                          pageConfig?.customImage?.privilege
                        ) &&
                          (pageConfig?.customImage?.imageUrl !== "" ? (
                            <img
                              className={"cursor-pointer"}
                              src={
                                pageConfig?.customImage &&
                                pageConfig?.customImage.imageUrl
                              }
                              alt="reset"
                              width="20px"
                              height="20px"
                              onClick={() =>
                                pageConfig?.customImage &&
                                pageConfig?.customImage.handleCustomImageMethod(
                                  item.id as any
                                )
                              }
                            />
                          ) : (
                            <PrimaryButton
                              variant="contained"
                              onClick={() =>
                                pageConfig?.customImage &&
                                pageConfig?.customImage.handleCustomImageMethod(
                                  item.id as any
                                )
                              }
                              sx={{ color: "#ffffff", width: "auto" }}
                            >
                              {pageConfig?.customImage?.buttonText}
                            </PrimaryButton>
                          ))}
                        {IsPrivilege?.includes(
                          pageConfig.blockUserPrivilege
                        ) && (
                            <img
                              title={`${item.row?.activityStatus
                                ? strings.usermgmt_button_active_user
                                : strings.usermgmt_button_in_active_user
                                }`}
                              className={"cursor-pointer"}
                              src={
                                item.row?.activityStatus
                                  ? images.activeToggleIcon
                                  : images.inActiveToggleIcon
                              }
                              alt="toggle user"
                              width="20px"
                              height="20px"
                              onClick={() =>
                                pageConfig.toggleUser &&
                                pageConfig.toggleUser(item.id as any)
                              }
                            />
                          )}
                        {IsPrivilege?.includes(pageConfig.editPrivilege) && (
                          <Link to={`${pageConfig.editButtonUrl}/${item.id}`}>
                            <img
                              src={images.editIcon}
                              alt="edit"
                              width="20px"
                              height="20px"
                            />
                          </Link>
                        )}
                        {IsPrivilege?.includes(pageConfig.deletePrivilege) && (
                          <img
                            className={"cursor-pointer"}
                            src={images.deleteIcon}
                            alt="delete"
                            width="20px"
                            height="20px"
                            onClick={() => deleteUser(item.id)}
                          />
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // colSpan={5}
                  count={pageResponse.totalElements}
                  rowsPerPage={pageSize}
                  page={index}
                  onRowsPerPageChange={(e) => {
                    setIndex(0);
                    setPageSize(parseInt(e.target.value, 10));
                  }}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">{strings.no_data_available}</Typography>
      )}
      {openModal && deleteModal}
    </Container>
  );
};
export default ListPage;
