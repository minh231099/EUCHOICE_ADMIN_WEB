import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment-timezone';
import { NotoSansRegular } from '../assets/fonts/fonts';
import { phoneNumberRender } from './validate';
import { localeDateTime } from './localeDate';
import { grey, orange } from '@ant-design/colors';

jsPDF.autoTableSetDefaults({
  headStyles: {
    fillColor: '#d81921',
    fontWeight: 'bold',
    fontStyle: 'bold',
    fontSize: 12,
    textColor: '#c0ffff',
    textAlign: 'center',
  },
});

export const exportPDF = (dataSource, pageName, tabName, columns) => {
  let sizePage = 'A4';
  if (pageName.includes('kalapa')) sizePage = 'A3';
  if (pageName.includes('cic-h2h')) sizePage = 'A3';
  const pdf = new jsPDF('landscape', 'pt', sizePage);
  pdf.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSansRegular);
  pdf.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal');
  pdf.setFont('NotoSans-Regular');

  const title = pageName + (tabName ? '_' + tabName : '');

  const marginLeft = 40;

  const headers = ['Index'];
  columns.forEach((item) => {
    if (!item.hideInTable && item.key !== 'action') {
      headers.push(item.title);
    }
  });

  const keys = [
    {
      key: 'index',
      type: 'number',
    },
  ];
  columns.forEach((item) => {
    if (!item.hideInTable && item.key !== 'action') {
      keys.push({ key: item.key, type: item.valueType, render: item.render });
    }
  });
  const data = dataSource.map((item, index) => {
    const row = keys.map((key) => {
      if (key) {
        if (key.key === 'index') {
          return index + 1;
        }
        if (key.key === 'requestUser') {
          return item['reqUser'] + '-' + item['reqUserName'];
        }
        if (key.render && item[key.key]) {
          if (key.key === 'phoneNumber')
            return phoneNumberRender(item[key.key]);
          if (key.key === 'fraud_level') return item[key.key];
          if (key.key !== 'national_id' && key.key !== 'idCode')
            return key.render(item[key.key]);
        }
        if (key.type && key.type == 'date') {
          return moment(item[key.key])
            .tz('Asia/Ho_Chi_Minh')
            .format('YYYY-MM-DD');
        }
        return item[key.key];
      }
    });
    return row;
  });
  let content = {
    startY: 50,
    head: [headers],
    body: data,
    styles: {
      font: 'NotoSans-Regular',
      fontStyle: 'normal',
    },
    headStyles: {
      fontWeight: 'bold',
    },
  };

  pdf.text(title, marginLeft, 40);
  pdf.autoTable(content);
  const fileName = title + '.pdf';
  pdf.save(fileName);
};

const formatVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
export const reconciDetail = (dataSource) => {
  const pdf = new jsPDF('landscape', 'pt', 'A4');
  pdf.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSansRegular);
  pdf.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal');
  pdf.setFont('NotoSans-Regular');
  const fileName = 'reconciliation.pdf';
  const styles = {
    font: 'NotoSans-Regular',
    fontStyle: 'normal',
  };

  const bd = [
    [
      { content: 'Request ID', colSpan: 1 },
      { content: 'Status', colSpan: 1 },
    ],
    [
      {
        content: dataSource.requestId ? dataSource.requestId : '-',
        colSpan: 1,
      },
      {
        content: dataSource.status ? dataSource.status : '-',
        colSpan: 1,
        styles: {
          textColor:
            dataSource.status === 'success' ? [56, 158, 13] : [255, 0, 0],
        },
      },
    ],
    [
      { content: 'Ref Num', colSpan: 1 },
      { content: '', colSpan: 1 },
    ],
    [
      { content: dataSource.refNum ? dataSource.refNum : '-', colSpan: 1 },
      { content: '', colSpan: 1 },
    ],
    [
      { content: 'MG', colSpan: 1 },
      { content: 'Partner', colSpan: 1 },
    ],
    [
      { content: dataSource.mgId ? dataSource.mgId : '-', colSpan: 1 },
      { content: dataSource.partner ? dataSource.partner : '-', colSpan: 1 },
    ],
    [
      { content: 'Pay Amount', colSpan: 1 },
      { content: 'Fee Amount', colSpan: 1 },
    ],
    [
      {
        content: dataSource.payAmount ? formatVND(dataSource.payAmount) : '-',
        colSpan: 1,
      },
      {
        content: dataSource.feeAmount ? formatVND(dataSource.feeAmount) : '-',
        colSpan: 1,
      },
    ],
    [
      { content: 'FT Amount', colSpan: 1 },
      { content: 'Payment Amount', colSpan: 1 },
    ],
    [
      {
        content: dataSource.ftAmount ? formatVND(dataSource.ftAmount) : '-',
        colSpan: 1,
        ...(dataSource.ftAmount && { styles: { textColor: [255, 0, 0] } }),
      },
      {
        content: dataSource.paymentAmount
          ? formatVND(dataSource.paymentAmount)
          : '-',
        colSpan: 1,
      },
    ],
    [
      { content: 'FT Fee ID', colSpan: 1 },
      { content: 'FT Payment ID', colSpan: 1 },
    ],
    [
      { content: dataSource.ftFeeId ? dataSource.ftFeeId : '-', colSpan: 1 },
      {
        content: dataSource.ftPaymentId ? dataSource.ftPaymentId : '-',
        colSpan: 1,
      },
    ],
    [
      { content: 'Request Time', colSpan: 1 },
      { content: 'Response Time', colSpan: 1 },
    ],
    [
      {
        content: dataSource.timeRequest
          ? localeDateTime(dataSource.timeRequest)
          : '-',
        colSpan: 1,
      },
      {
        content: dataSource.timeResponse
          ? localeDateTime(dataSource.timeResponse)
          : '-',
        colSpan: 1,
      },
    ],
    [{ content: 'Description', colSpan: 2 }],
    [
      {
        content: dataSource.description ? dataSource.description : '-',
        colSpan: 1,
      },
    ],
  ];

  let content = {
    startY: 50,
    head: [[{ content: 'Payment History Details', colSpan: 2 }]],
    body: bd,
    theme: 'plain',
    styles: { ...styles, fontSize: 12, color: 'black' },
    headStyles: {
      fontSize: 16,
      fillColor: orange[2],
      textColor: 'black',
    },

    didParseCell: function (data) {
      if (data.row.section === 'head') return;
      if (!(data.row.index % 2)) {
        data.cell.styles.fontSize = 12;
        data.cell.styles.textColor = grey[5];
      }
    },
  };
  pdf.autoTable(content);
  pdf.save(fileName);
};

export const userDetail = (dataSource) => {
  const pdf = new jsPDF('landscape', 'pt', 'A4');
  pdf.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSansRegular);
  pdf.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal');
  pdf.setFont('NotoSans-Regular');
  const fileName = 'user.pdf';
  const styles = {
    font: 'NotoSans-Regular',
    fontStyle: 'normal',
  };

  const USER_TYPE = {
    PARTNER: 'PARTNER',
    PTF: 'PTF',
  };

  const bd = [
    [
      { content: 'Username', colSpan: 1 },
      { content: 'User ID', colSpan: 1 },
      { content: 'User Type', colSpan: 1 },
    ],
    [
      { content: dataSource.username ? dataSource.username : '-', colSpan: 1 },
      {
        content: dataSource.uid ? dataSource.uid : '-',
        colSpan: 1,
      },
      {
        content:
          dataSource.partner && dataSource.partner.id
            ? USER_TYPE.PARTNER
            : USER_TYPE.PTF,
        colSpan: 1,
      },
    ],

    [
      { content: 'Name', colSpan: 1 },
      { content: 'Email', colSpan: 1 },
    ],
    [
      { content: dataSource.name ? dataSource.name : '-', colSpan: 1 },
      { content: dataSource.email ? dataSource.email : '-', colSpan: 1 },
    ],
    [
      { content: 'Phone number', colSpan: 1 },
      { content: 'Note', colSpan: 1 },
    ],
    [
      {
        content: dataSource.phoneNumber ? dataSource.phoneNumber : '-',
        colSpan: 1,
      },
      { content: dataSource.note ? dataSource.note : '-', colSpan: 1 },
    ],

    [
      ...(dataSource.partner && dataSource.partner.id
        ? [
            { content: 'Roles', colSpan: 1 },
            { content: 'Partners', colSpan: 1 },
          ]
        : [
            { content: 'Code', colSpan: 1 },
            { content: 'Roles', colSpan: 1 },
          ]),
    ],

    [
      ...(dataSource.partner && dataSource.partner.id
        ? [
            {
              content:
                dataSource.roleId && dataSource.roleId.name
                  ? dataSource.roleId.name
                  : '-',
              colSpan: 1,
            },
            {
              content:
                dataSource.partner && dataSource.partner.name
                  ? dataSource.partner.name
                  : '-',
              colSpan: 1,
            },
          ]
        : [
            { content: dataSource.code ? dataSource.code : '-', colSpan: 1 },
            {
              content:
                dataSource.roleId && dataSource.roleId.name
                  ? dataSource.roleId.name
                  : '-',
              colSpan: 1,
            },
          ]),
    ],
  ];

  let content = {
    startY: 50,
    head: [[{ content: 'User Details', colSpan: 3 }]],
    body: bd,
    theme: 'plain',
    styles: { ...styles, fontSize: 12, color: 'black' },
    headStyles: {
      fontSize: 16,
      fillColor: orange[2],
      textColor: 'black',
    },

    didParseCell: function (data) {
      if (data.row.section === 'head') return;
      if (!(data.row.index % 2)) {
        data.cell.styles.fontSize = 12;
        data.cell.styles.textColor = grey[5];
      }
    },
  };
  pdf.autoTable(content);
  pdf.save(fileName);
};
