import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { convertNumberToMoney, convertToDateTime, randomFileName } from "./lib";

// eslint-disable-next-line
const logoPath = "data:image/png;base64,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"

const exportListInvoicePDF = (listRecord) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [147, 175],
    });

    listRecord.forEach(record => {
        createInvoice(doc, record);

        doc.setLineWidth(0.1);
        doc.setLineDash([5, 1], 0);
        doc.setDrawColor('#ccc');
        doc.line(62, 0, 62, 175);
        doc.line(0, 75, 147, 75);
        doc.line(0, 147.5, 147, 147.5);


        doc.setLineDash(0, 0);
        doc.setDrawColor('#000');
        doc.setLineWidth(2.0);
        doc.line(0, 0, 147, 0);
        doc.line(0, 0, 0, 175);
        doc.line(0, 175, 147, 175);
        doc.line(147, 0, 147, 175);
    })

    const fileName = `invoice_${randomFileName()}.pdf`
    doc.save(fileName);
}

const getPackageInfo = (cart) => {
    let rs = '';
    cart.forEach((value, index) => {
        rs += `${index + 1}. ${value.product.name}${value?.type?.group1 ? `, ${value.type.group1}` : ''}${value?.type?.group2 ? `, ${value.type.group2}` : ''}\tSL:${value.amount}\n`;
    });

    return rs;
}

const getPackageWeight = (cart) => {
    let rs = 0;
    cart.forEach(value => {
        const { product } = value;
        rs += product.weight * value.amount;
    });

    return `${rs}g`;
}

const getTotalQty = (cart) => {
    let cnt = 0;
    cart.forEach(value => {
        cnt += value.amount;
    });
    return cnt;
}

const getTotalPrice = (cart) => {
    let rs = 0;
    cart.forEach(value => {
        const { type } = value;
        rs += type.price * value.amount;
    });

    return rs
}

const createInvoice = (doc, record) => {
    const { warehouse, shippingInfo, cart, createdAt } = record;

    const canvas = document.createElement("canvas");
    JsBarcode(canvas, record.orderId);
    const barcodeDataUrl = canvas.toDataURL("image/png");

    const firstRow = [
        {
            content: 'From:', colSpan: 1,
        },
        {
            content: '', colSpan: 2
        },
    ];
    const secondRow = [
        {
            content: `Name: ${warehouse.name}\nAddress: ${warehouse.address}, ${warehouse.city}, ${warehouse.country}`,
            styles: { minCellHeight: 65 },
            colSpan: 1,
        },
        {
            content: '', colSpan: 2
        },
    ]
    const thirdRow = [
        {
            content: 'To:', colSpan: 1,
        },
        {
            content: `Package Information(${cart.length}):`, colSpan: 2,
        },
    ];
    const fourthRow = [
        {
            content: `Name: ${shippingInfo.name}\nAddress: ${shippingInfo.address}, ${shippingInfo.ward}, ${shippingInfo.provine}, ${shippingInfo.city}, ${shippingInfo.country}\nPhone: ${shippingInfo.phonenumber}`,
            colSpan: 1,
        },
        {
            content: `${getPackageInfo(cart)}`,
            colSpan: 2,
            styles: { minCellHeight: 65 },
        },
    ]

    const fifthRow = [
        { content: `Order Date: ${convertToDateTime(createdAt)}`, colSpan: 1, },
        { content: `Total Items: ${cart.length}`, colSpan: 1, },
        {
            content: `Total Price: ${convertNumberToMoney(getTotalPrice(cart))} vnd`,
            rowSpan: 2,
            styles: {
                valign: 'middle',
                halign: 'left',
                fontSize: 12,
                fontStyle: 'bold',
                border: { top: 1 }
            },
        }
    ]

    const sixthRow = [
        { content: `Number Of Package: ${1}`, colSpan: 1, },
        { content: `Total Qty: ${getTotalQty(cart)}`, colSpan: 1, },
    ];

    const seventhRow = [
        { content: `Weight: ${getPackageWeight(cart)}`, colSpan: 1, },
        { content: '', colSpan: 1, },
    ]

    autoTable(doc, {
        body: [
            firstRow,
            secondRow,
            thirdRow,
            fourthRow,
            fifthRow,
            sixthRow,
            seventhRow,
        ],
        margin: { top: 2, right: 2, bottom: 2, left: 2 },
        headStyles: { fillColor: null, textColor: '#000' },
        columnStyles: {
            0: { cellWidth: 60, fillColor: '#fff', textColor: '#000' },
            1: { cellWidth: 40, fillColor: '#fff', textColor: '#000' },
            2: { cellWidth: 40, fillColor: '#fff', textColor: '#000' },
        },
        didDrawCell: function (cell) {
            doc.setFillColor(255, 255, 255);
            doc.setTextColor(0, 0, 0);
            if (cell.row.index === 1 && cell.column.index === 1) {
                doc.addImage(logoPath, 'PNG', cell.row.cells[1].x + 20, cell.row.cells[1].y + 1, 40, 23.79);
                doc.text('BILL NUMBER', cell.row.cells[1].x + 3, cell.row.cells[1].y + 32)
                doc.addImage(barcodeDataUrl, 'PNG', cell.row.cells[1].x, cell.row.cells[1].y + 34, 80, 30)
            }
        },
        showHead: 'never',
    })
}

export default exportListInvoicePDF;