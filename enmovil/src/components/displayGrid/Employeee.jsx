import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Employeee() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const onButtonClick = (e, row) => {
         navigate(`/editform/:${row.ID}`);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://216.48.185.128:3001/assetEmp/getEmployees');
                const data = response.data.records;
                const formattedData = data.map(item => ({
                    ID: item.empId,
                    NAME: item.firstName,
                    EMAIL: item.email,
                    PHONE: item.phonePersonal,
                    ADDRESS: item.address,
                    WORK: item.responsibilities,
                    REPORTINGTO: item.reportingTo,
                    DESIGNATION: item.designation || 'software',
                    WORK_PHONE: item.phHome,
                    WORK_EMAIL: item.email,
                    WORK_TEAMS: item.reportingTo || 'N/A',
                    MANAGER: item.reportingTo,
                }));
                setRowData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const CustomButtonComponent = (params) => {
        return (
           
            <Link to={`/app/editform/`+params.data.ID}>
                <Button  variant="contained">
                    Edit
                </Button>
            </Link>
            
        );
    };

    const columnDefs = [
        {
            headerName: "Actions",
            field: "action",
            cellRenderer: CustomButtonComponent,
            cellStyle: { borderRightColor: '#e2e2e2' },
            width: 160,
            sortable: false,
        },
        {
            headerName: "EMP ID",
            field: "ID",
            pinned: 'left',
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: "agSetColumnFilter",
            filterParams: {
                applyMiniFilterWhileTyping: true,
            },
        },
        {
            headerName: "NAME",
            field: "NAME",
            pinned: 'left',
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "EMAIL",
            field: "EMAIL",
            pinned: 'left',
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "PHONE NO",
            field: "PHONE",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "ADDRESS",
            field: "ADDRESS",
            width: 300,
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "WORK LOCATION",
            field: "WORK",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "REPORTINGTO",
            field: "REPORTINGTO",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "DESIGNATION",
            field: "DESIGNATION",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "WORK PHONE",
            field: "WORK_PHONE",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "WORK EMAIL",
            field: "WORK_EMAIL",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "WORK TEAMS",
            field: "WORK_TEAMS",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            headerName: "TEAM",
            field: "MANAGER",
            cellStyle: { borderRightColor: '#e2e2e2' },
            filter: 'agSetColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
    ];

    return (
        <div style={styles.container}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                }}>
                    <div>Loading...</div>
                </div>
            )}
            <div className="ag-theme-alpine" style={styles.grid}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={20}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                    }}
                />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative'
    },
    grid: {
        flex: 1,
    }
};

export default Employeee;
