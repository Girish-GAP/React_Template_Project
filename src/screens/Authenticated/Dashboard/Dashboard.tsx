// need to work in this screen

import { Authenticated, Privilege } from "../../../utils/redux/reducer/authentication-slice";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import strings from "../../../common/Translation/Translate";
import { URLS } from "../../../utils/constants/urls";
import { routes } from "../../../utils/constants/routes";
import { privileges } from "../../../utils/constants/privileges";
import axiosInstance from "../../../utils/axios";
import ListPage from "../CommonPage";
import {  useTheme, Container, Grid, Typography, Divider, Popover, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { images } from "../../../utils/constants/images";


const Dashboard = () => {

    const [pageResponse, setPageResponse] = useState<any[]>([]);
    const theme = useTheme();
    const IsPrivilege = useSelector(Privilege);

    const pageConfig = {
        title: strings.agent_title_list,
        AddButtonText: strings.agent_button_add,
        AddButtonUrl: routes.addAgent,
        editButtonUrl: routes.editAgent,
        // listApi: URLS.agents,
        listApi : "http://localhost:3001/union/get-faculties",
        deleteApi: URLS.deleteAgent,
        editPrivilege: privileges.edit_agent,
        deletePrivilege: privileges.delete_agent,
        addPrivilege: privileges.add_agent,
        tableColumn: [
          { field: 'agent', headerName: strings.agent_column_name, flex: 1 },
        ]
      }

      const getList = useCallback(async () => {
        try {
          const { data } = await axiosInstance.get(pageConfig.listApi);
          setPageResponse(data);
          console.log('Data form server ', data);
        } catch (error: any) { }
      }, [pageConfig.listApi]);


    // This is the syntax for defining an anonymous async function
    // The function is wrapped in parentheses to make it an expression.
    // (): These parentheses at the end of the function declaration are used to invoke the function immediately after it is defined.
    // When the code is executed, the IIFE is immediately invoked and the await getList() 
    // statement inside the IIFE will pause the function execution 
    // until the getList() function has completed its execution.
    // This pattern is often used in React applications to handle asynchronous data fetching and 
    // processing within a component's lifecycle method, 
    // such as in the useEffect hook.
    useEffect(()=>{
        (async ()=>{
            getList();
        })();
    }, [])

    return(
<Container sx={{ p: 0 }}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
            {pageConfig.title}
          </Typography>
        </Grid>
        <Grid justifyContent='end' item md={4} textAlign={"right"}>
            <PrimaryButton
              variant="contained"
              onClick={() => {
                // Navigate(pageConfig.AddButtonUrl);
              }}
              sx={{ color: "#ffffff", width: "auto" }}
            >
              {pageConfig.AddButtonText}
            </PrimaryButton>

        </Grid>
      </Grid>
      <Divider sx={{ mt: 1 }} />

      {pageResponse?.length > 0 ? (
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
              {pageResponse?.length > 0 &&
                pageResponse?.map((item: any, indexValue: number) => (
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      verticalAlign: "top",
                    }}
                    key={indexValue}
                  >
                    {pageConfig.tableColumn.map((_header: any, i: number) => (
                      <TableCell key={i}>{item.firstName}  {item.lastName}</TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  // colSpan={5}
                  count={pageResponse.length}
                  rowsPerPage={5}
                  page={1}
                  onRowsPerPageChange={(e) => {
                    // setIndex(0);
                    // setPageSize(parseInt(e.target.value, 10));
                  }}
                  onPageChange={()=>{}}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6">{strings.no_data_available}</Typography>
      )}
      {/* {openModal && deleteModal} */}
    </Container>
    )
}


export default Dashboard;