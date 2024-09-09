import { React, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditFileModal from "./EditFileModal";
import AddPrivilegeModal from "./AddPrivilegeModal";

function FilesTable({
  files,
  handleDelete,
  handleEdit,
  handleAddPrivilege,
  company,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const open = Boolean(anchorEl);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);

  const togglePrivilegeModal = () => {
    setShowPrivilegeModal(!showPrivilegeModal);
    handleClose();
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
    handleClose();
  };

  const handleClick = (event, fileId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileId(fileId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "File Name", width: 200 },
    { field: "size", headerName: "Size (bytes)", width: 200 },
    { field: "mime_type", headerName: "Type", width: 200 },
    { field: "user_id", headerName: "Author", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => handleClick(event, params.row.id)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open && selectedFileId === params.row.id}
            onClose={handleClose}
          >
            <MenuItem onClick={toggleEditModal}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(selectedFileId)}>
              Delete
            </MenuItem>
            <MenuItem onClick={togglePrivilegeModal}>Add Privilege</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{ height: 400, width: "100%", margin: "0 auto", padding: "20px" }}
    >
      <DataGrid rows={files} columns={columns} pageSize={5} />

      <EditFileModal
        show={showEditModal}
        onClose={toggleEditModal}
        handleEdit={handleEdit}
        id={selectedFileId}
      />
      <AddPrivilegeModal
        show={showPrivilegeModal}
        onClose={togglePrivilegeModal}
        company={company}
        file_id={selectedFileId}
        handleAdd={handleAddPrivilege}
      />
    </div>
  );
}

export default FilesTable;
