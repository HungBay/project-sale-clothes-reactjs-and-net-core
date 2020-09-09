// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Divider,
// } from '@material-ui/core';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import { makeStyles } from '@material-ui/styles';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import React from 'react';
// import ApexChart from './column-chart';

// const useStyles = makeStyles(() => ({
//   root: {},
//   chartContainer: {
//     height: 400,
//     position: 'relative',
//   },
//   actions: {
//     justifyContent: 'flex-end',
//   },
// }));

// const LatestSales = props => {
//   const { className, charts, ...rest } = props;

//   const classes = useStyles();

//   return (
//     <Card {...rest} className={clsx(classes.root, className)}>
//       <CardHeader title="Thông kê theo tháng" />
//       <Divider />
//       <CardContent>
//         <div className={classes.chartContainer}>
//           {/* <Bar data={data} options={options} /> */}
//           <ApexChart charts={charts} />
//         </div>
//       </CardContent>
//       <Divider />
//       <CardActions className={classes.actions}>
//         <Button color="primary" size="small" variant="text">
//           Overview <ArrowRightIcon />
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// LatestSales.propTypes = {
//   className: PropTypes.string,
// };

// export default LatestSales;
