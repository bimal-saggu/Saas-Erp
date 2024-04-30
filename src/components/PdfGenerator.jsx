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
    tableDataText: {
        fontSize: "12px",
        fontWeight: "400",
        textAlign: "center",
        marginBottom: "5px",
        marginTop: "5px",
        width: "120px",
    }
})

const PdfGenerator = ({projects, projectType}) => {

    // Function to render the text fields based on the selected button
    const renderTextFields = (project) => {
        switch (projectType) {
            case "APARTMENT":
                return (
                    <>
                        <Text style={styles.tableDataText}>{project.tower_number}</Text>
                        <Text style={styles.tableDataText}>{project.flat_number}</Text>
                    </>
                );
            case "VILLA":
                return <Text style={styles.tableDataText}>{project.villa_number}</Text>;
            case "PLOT":
                return <Text style={styles.tableDataText}>{project.plot_number}</Text>;
            case "FARM_LAND":
                return (
                    <>
                        <Text style={styles.tableDataText}>{project.plot_number}</Text>
                        <Text style={styles.tableDataText}>{project.sq_yards}</Text>
                    </>
                );
            default:
                return null;
        }
    };

  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.heading}>{projectType} Table Data</Text>
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Sno</Text>
                <Text style={styles.tableHeaderText}>Project Name</Text>
                {projectType === "APARTMENT" && (
                  <>
                    <Text style={styles.tableHeaderText}>Tower Number</Text>
                    <Text style={styles.tableHeaderText}>Flat Number</Text>
                  </>
                )}
                {projectType === "VILLA" && (
                  <Text style={styles.tableHeaderText}>Villa Number</Text>
                )}
                {projectType === "PLOT" && (
                  <Text style={styles.tableHeaderText}>Plot Number</Text>
                )}
                {projectType === "FARM_LAND" && (
                  <>
                    <Text style={styles.tableHeaderText}>Plot Number</Text>
                    <Text style={styles.tableHeaderText}>Sq Yards</Text>
                  </>
                )}
                <Text style={styles.tableHeaderText}>Status</Text>
            </View>
            {projects.map((project, index) => (
            <View style={styles.tableData} key={index}>
                <Text style={styles.tableDataText}>{index + 1}</Text>
                <Text style={styles.tableDataText}>{project.project_name}</Text>
                {renderTextFields(project)}
                <Text style={styles.tableDataText}>{project.status}</Text>
            </View>))}
        </Page>
    </Document>
  );
};

export default PdfGenerator;
