import { Stack } from "@mui/material";

const Table = ({ itemList, userId }) => {
  return (
    <Stack>
      <table style={{ width: "100%", color:"black"}}>
        <thead>
          <tr>
            <th style={{ width: "20px", color:"black" }}>#</th>
            <th style={{ width: "200px", color:"black"}}>Caffee Name</th>
            <th style={{ width: "300px", color:"black" }}>Description</th>
            <th style={{ width: "300px", color:"black"}}>City</th>
          </tr>
        </thead>
        <tbody>
        {itemList
            ? itemList.map((item, index) => {
                if ( userId === item.userId) {
                  return (
                    <tr key={index} style={{color:"black"}}>
                      <td style={{ color:"black"}}>{index +1 }</td>
                      <td style={{ color:"black"}}>{item.name}</td>
                      <td style={{ color:"black"}}>{item.description}</td>
                      <td style={{ color:"black"}}>{item.city}</td>
                    </tr>
                  );
                }
                return ;
              })
            : null}
        </tbody>
      </table>
    </Stack>
  );
};

export default Table;
