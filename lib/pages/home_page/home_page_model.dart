import 'package:q_r_checkin/index.dart';

import '/components/drawer/drawer_widget.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:flutter/material.dart';

class HomePageModel extends FlutterFlowModel<HomePageWidget> {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();

  /// Property for Ticket Class
  late Map<String, dynamic> ticket;
  // Model for Drawer component.
  late DrawerModel drawerModel;
  // State field(s) for qrInputField widget.
  FocusNode? qrInputFieldFocusNode;
  TextEditingController? qrInputFieldTextController;
  String? Function(BuildContext, String?)? qrInputFieldTextControllerValidator;

  @override
  void initState(BuildContext context) {
    drawerModel = createModel(context, () => DrawerModel());
  }

  @override
  void dispose() {
    unfocusNode.dispose();
    drawerModel.dispose();
    qrInputFieldFocusNode?.dispose();
    qrInputFieldTextController?.dispose();
  }
}
