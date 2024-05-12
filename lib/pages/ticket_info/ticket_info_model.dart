import '/components/drawer/drawer_widget.dart';
import '/components/ticket_log/ticket_log_widget.dart';
import '/components/upper_card_content/upper_card_content_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'ticket_info_widget.dart' show TicketInfoWidget;
import 'package:flutter/material.dart';

class TicketInfoModel extends FlutterFlowModel<TicketInfoWidget> {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // Model for UpperCardContent component.
  late UpperCardContentModel upperCardContentModel1;
  // Model for UpperCardContent component.
  late UpperCardContentModel upperCardContentModel2;
  // Model for UpperCardContent component.
  late UpperCardContentModel upperCardContentModel3;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel1;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel2;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel3;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel4;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel5;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel6;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel7;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel8;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel9;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel10;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel11;
  // Model for TicketLog component.
  late TicketLogModel ticketLogModel12;
  // Model for Drawer component.
  late DrawerModel drawerModel;

  @override
  void initState(BuildContext context) {
    upperCardContentModel1 =
        createModel(context, () => UpperCardContentModel());
    upperCardContentModel2 =
        createModel(context, () => UpperCardContentModel());
    upperCardContentModel3 =
        createModel(context, () => UpperCardContentModel());
    ticketLogModel1 = createModel(context, () => TicketLogModel());
    ticketLogModel2 = createModel(context, () => TicketLogModel());
    ticketLogModel3 = createModel(context, () => TicketLogModel());
    ticketLogModel4 = createModel(context, () => TicketLogModel());
    ticketLogModel5 = createModel(context, () => TicketLogModel());
    ticketLogModel6 = createModel(context, () => TicketLogModel());
    ticketLogModel7 = createModel(context, () => TicketLogModel());
    ticketLogModel8 = createModel(context, () => TicketLogModel());
    ticketLogModel9 = createModel(context, () => TicketLogModel());
    ticketLogModel10 = createModel(context, () => TicketLogModel());
    ticketLogModel11 = createModel(context, () => TicketLogModel());
    ticketLogModel12 = createModel(context, () => TicketLogModel());
    drawerModel = createModel(context, () => DrawerModel());
  }

  @override
  void dispose() {
    unfocusNode.dispose();
    upperCardContentModel1.dispose();
    upperCardContentModel2.dispose();
    upperCardContentModel3.dispose();
    ticketLogModel1.dispose();
    ticketLogModel2.dispose();
    ticketLogModel3.dispose();
    ticketLogModel4.dispose();
    ticketLogModel5.dispose();
    ticketLogModel6.dispose();
    ticketLogModel7.dispose();
    ticketLogModel8.dispose();
    ticketLogModel9.dispose();
    ticketLogModel10.dispose();
    ticketLogModel11.dispose();
    ticketLogModel12.dispose();
    drawerModel.dispose();
  }
}
