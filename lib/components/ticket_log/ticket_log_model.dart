import '/flutter_flow/flutter_flow_util.dart';
import 'ticket_log_widget.dart' show TicketLogWidget;
import 'package:flutter/material.dart';

class TicketLogModel extends FlutterFlowModel<TicketLogWidget> {
  late String dateUsage;
  late String timeUsage;
  late String loggingType = "Log Out";

  TicketLogModel({
    required this.dateUsage,
    required this.timeUsage,
    this.loggingType = "Log Out", // Optional with default
  });

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {}
}
