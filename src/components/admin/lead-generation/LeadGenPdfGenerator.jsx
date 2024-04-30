import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        alignItems: "center",
    },
    heading: {
        fontSize: "24px",
        textAlign: "center",
        fontWeight: '800',
        marginBottom: "20px",
        textTransform: "uppercase",
    },
    tableHeader: {
        display: "flex",
        flexDirection: "row",
        borderTop: "1px solid #000",
        borderBottom: "1px solid #000",
        paddingLeft: "15px",
        paddingRight: "15px",
    },
    tableData: {
        display: "flex",
        flexDirection: "row",
        borderBottom: "0.5px solid #000",
        paddingLeft: "15px",
        paddingRight: "15px",
    },
    tableHeaderText: {
        fontSize: "14px",
        fontWeight: "600",
        textAlign: "center",
        marginTop: "10px",
        marginBottom: "10px",
        width: "120px",
    },
    tableHeaderEmailText: {
        fontSize: "14px",
        fontWeight: "600",
        textAlign: "center",
        marginTop: "10px",
        marginBottom: "10px",
        width: "170px",
    },
    tableDataText: {
        fontSize: "12px",
        fontWeight: "400",
        textAlign: "center",
        marginBottom: "5px",
        marginTop: "5px",
        width: "120px",
    },
    tableDataEmailText: {
        fontSize: "12px",
        fontWeight: "400",
        textAlign: "center",
        marginBottom: "5px",
        marginTop: "5px",
        width: "170px",
    }
});

const LeadGenPdfGenerator = ({ leadGeneration }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.heading}>Lead Generation</Text>
                </View>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Name</Text>
                    <Text style={styles.tableHeaderEmailText}>Email ID</Text>
                    <Text style={styles.tableHeaderText}>Phone Number</Text>
                    <Text style={styles.tableHeaderText}>Location</Text>
                </View>
                {leadGeneration.map((lead, index) => (
                    <View style={styles.tableData} key={index}>
                        <Text style={styles.tableDataText}>{lead.name}</Text>
                        <Text style={styles.tableDataEmailText}>{lead.emailId}</Text>
                        <Text style={styles.tableDataText}>{lead.phoneNumber}</Text>
                        <Text style={styles.tableDataText}>{lead.location}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default LeadGenPdfGenerator;
