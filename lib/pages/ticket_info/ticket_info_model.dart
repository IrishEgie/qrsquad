import '/components/drawer/drawer_widget.dart';
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
  // Model for Drawer component.
  late DrawerModel drawerModel;

  @override
  void initState(BuildContext context) {
    // Ticket Details
    upperCardContentModel1 =
        createModel(context, () => UpperCardContentModel());
    upperCardContentModel2 =
        createModel(context, () => UpperCardContentModel());
    upperCardContentModel3 =
        createModel(context, () => UpperCardContentModel());
    drawerModel = createModel(context, () => DrawerModel());
  }

  @override
  void dispose() {
    unfocusNode.dispose();
    upperCardContentModel1.dispose();
    upperCardContentModel2.dispose();
    upperCardContentModel3.dispose();
    drawerModel.dispose();
  }
}
