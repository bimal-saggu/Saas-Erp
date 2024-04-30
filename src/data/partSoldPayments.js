const partSoldPayments = [
  {
    projectID: 20001,
    payment: [
      { receipt_id: "INV12345", date: "2024-01-15", amount: 25000 },
      { receipt_id: "INV67890", date: "2024-02-15", amount: 30000 },
      { receipt_id: "INV54321", date: "2024-02-15", amount: 30000 },
      { receipt_id: "INV12345", date: "2024-02-15", amount: 30000 },
      { receipt_id: "INV12345", date: "2024-02-15", amount: 30000 },
      { receipt_id: "INV12345", date: "2024-02-15", amount: 30000 },
      { receipt_id: "INV12345", date: "2024-02-15", amount: 30000 }
    ]
  },
    {
      projectID: 20002,
      payment: [
        { receipt_id: "INV12345", date: "2024-01-15", amount: 25000 },
        { receipt_id: "INV67890", date: "2024-02-15", amount: 30000 }
      ]
    },
    {
      projectID: 20003,
      payment: { date: "", amount: "" }
    },
    {
      projectID: 20004,
      payment: [
        { receipt_id: "INV12345", date: "2024-01-15", amount: 25000 },
        { receipt_id: "INV67890", date: "2024-02-15", amount: 30000 }
      ]
    },
    {
      projectID: 20005,
      payment: { date: "", amount: "" }
    },
    {
      projectID: 20006,
      payment: [
        { receipt_id: "INV54321", date: "2024-01-15", amount: 25000 },
        { receipt_id: "INV67890", date: "2024-02-15", amount: 30000 }
      ]
    },
    {
      projectID: 20007,
      payment: { date: "2024-02-15", amount: 30000 }
    },
    {
      projectID: 20008,
      payment: { date: "2024-01-01", amount: 25000 }
    },
    {
      projectID: 20010,
      payment: { date: "2024-03-05", amount: 40000 }
    }
];
  
export default partSoldPayments;
  