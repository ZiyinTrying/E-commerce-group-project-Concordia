import React, { useEffect, useState } from "react";
import styled from "styled-components";

import moment from "moment";

import Button from "./Button";
import { handleTotal } from "./Total";

const Confirmation = () => {
	let date = moment(new Date()).format("MMMM Do YYYY, h:mm A");

	const orderId = localStorage.getItem("order-id");

	const [userOrder, setUserOrder] = useState(false)

	useEffect(() => {
		fetch(`/order/${orderId}`)
		.then(res => res.json())
		.then(data => setUserOrder(data.result))
	},[])

	return (
		<>
			{
				userOrder &&
					<Wrapper>
					<ConfirmationWrapper>
						<Title>Thank you&nbsp;{userOrder.name}&nbsp;for your order</Title>
						<p>Your order has been received and is now being processed.</p>
						<p>Your order details are shown below for your reference:</p>
						<SubWrapper>
							<SubTitle>Order summary</SubTitle>
							<h3 style={{ margin: 0 }}>
								Order number:&nbsp;<Bold>{userOrder._id}</Bold>
							</h3>
							<div>{date}</div>
							<Table>
								<tbody>
									<tr>
										<th
											style={{
												textAlign: "left",
												borderTop: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											Description
										</th>
										<th
											style={{
												textAlign: "center",
												borderTop: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											Quantity
										</th>
										<th
											style={{
												textAlign: "right",
												borderTop: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											Price
										</th>
									</tr>
									{userOrder.items.map((item) => {
										return (
											<tr>
												<td style={{ textAlign: "left" }}>
													{item.name}
												</td>
												<td style={{ textAlign: "center" }}>{item.quantity}</td>
												<td style={{ textAlign: "right" }}>{item.price}</td>
											</tr>
										)
									})}
									
									<tr>
										<th
											style={{
												textAlign: "left",
												borderBottom: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											Total
										</th>
										<th
											style={{
												textAlign: "center",
												borderBottom: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											&nbsp;
										</th>
										<th
											style={{
												textAlign: "right",
												borderBottom: "1px solid lightgrey",
												borderCollapse: "collapse",
											}}
										>
											${handleTotal(userOrder.items)}
										</th>
									</tr>
								</tbody>
							</Table>
						</SubWrapper>
						<SubWrapper>
							<SubTitle>Shipping address</SubTitle>
							<div>{userOrder.name}</div>
							<div>{userOrder.address},&nbsp;{userOrder.city}</div>
							<div>{userOrder.province},&nbsp;{userOrder.postalCode}</div>
							<div>{userOrder.email}</div>
						</SubWrapper>
						<Button />
					</ConfirmationWrapper>
				</Wrapper>
			}
		</>
	);
};

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	padding-top: 80px;
`;
const ConfirmationWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 800px;
	border-radius: 10px;
	background: var(--color-dark-grey);
	font-size: 18px;
	margin-top: 50px;
	margin-bottom: 50px;
	box-shadow: 0 0 10px var(--color-lime), 0 0 40px var(--color-lime),
    0 0 80px var(--color-lime);
`;
const Title = styled.h1`
	margin-top: 20px;
	text-align: center;
	background: var(--color-lime);
	color: var(--color-dark-grey);
	padding: 15px;
	font-size: 26px;
	width: 75%;
	border-radius: 5px;
`;
const SubWrapper = styled.div`
	width: 80%;
	margin-bottom: 20px;
`;
const SubTitle = styled.h3`
	text-transform: uppercase;
	background: var(--color-lime);
	color: var(--color-dark-grey);
	padding: 15px;
	font-size: 20px;
	border-radius: 5px;
`;
const Bold = styled.span`
	font-weight: bold;
`;
const Table = styled.table`
	margin-top: 20px;
	width: 100%;
`;

export default Confirmation;
