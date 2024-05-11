import 'dart:async';

import 'package:q_r_checkin/alert_notif/ticket_loggged/ticket_loggged_widget.dart';
import 'package:q_r_checkin/pages/home_page/home_page_model.dart';

import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'ticket_detected_model.dart';

class TicketDetectedWidget extends StatefulWidget {
  final HomePageModel model;

  const TicketDetectedWidget(this.model, {super.key});

  @override
  State<TicketDetectedWidget> createState() => _TicketDetectedWidgetState();
}

class _TicketDetectedWidgetState extends State<TicketDetectedWidget> {
  late TicketDetectedModel _model;
  late HomePageModel _homeModel;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => TicketDetectedModel());
    WidgetsBinding.instance.addPostFrameCallback((_) => setState(() {}));
    _homeModel = widget.model;
    fetchingTicket();
  }

  @override
  void dispose() {
    _model.dispose();
    // _homeModel.dispose();
    super.dispose();
  }

  void fetchingTicket() {
    if ((_homeModel.ticket["success"]) != Null) {
      if ((_homeModel.ticket["success"])) {
        Timer(const Duration(seconds: 2), () {
          showModalBottomSheet(
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            useSafeArea: true,
            context: context,
            enableDrag: false,
            builder: (context) {
              return GestureDetector(
                onTap: () => _homeModel.unfocusNode.canRequestFocus
                    ? FocusScope.of(context)
                        .requestFocus(_homeModel.unfocusNode)
                    : FocusScope.of(context).unfocus(),
                child: Padding(
                  padding: MediaQuery.viewInsetsOf(context),
                  child: SizedBox(
                    height: MediaQuery.sizeOf(context).height * 1.0,
                    child: const TicketLogggedWidget(),
                  ),
                ),
              );
            },
          ).then((value) => safeSetState(() {
                Timer(const Duration(milliseconds: 1), () {
                  Navigator.pop(context); // Close the modal
                });
              }));
          Timer(const Duration(milliseconds: 1000), () {
            Navigator.pop(context);
          });
        });
      } else {
        Timer(const Duration(milliseconds: 1000), () {
          Navigator.pop(context);
        });
      }
    } else {
      Timer(const Duration(milliseconds: 1000), () {
        Navigator.pop(context);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.max,
      children: [
        SizedBox(
          width: MediaQuery.sizeOf(context).width * 1.0,
          height: MediaQuery.sizeOf(context).height * 1.0,
          child: Stack(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(0.0),
                child: BackdropFilter(
                  filter: ImageFilter.blur(
                    sigmaX: 8.0,
                    sigmaY: 8.0,
                  ),
                  child: Container(
                    width: MediaQuery.sizeOf(context).width * 1.0,
                    height: MediaQuery.sizeOf(context).height * 1.0,
                    decoration: BoxDecoration(
                      color: FlutterFlowTheme.of(context).accent4,
                    ),
                  ),
                ),
              ),
              Align(
                alignment: const AlignmentDirectional(0.0, 0.0),
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      (_homeModel.ticket["success"] != Null)
                          ? ((_homeModel.ticket["success"])
                              ? Icons.qr_code_rounded
                              : Icons.warning_amber_rounded)
                          : Icons.pest_control_rounded,
                      color: FlutterFlowTheme.of(context).primary,
                      size: 128.0,
                    ),
                    Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(
                          0.0, 16.0, 0.0, 0.0),
                      child: Text(
                        (_homeModel.ticket["success"] != Null)
                            ? ((_homeModel.ticket["success"])
                                ? 'Ticket Detected'
                                : 'Sorry, Ticket not Found!')
                            : 'Database Connection Error',
                        style: FlutterFlowTheme.of(context)
                            .headlineMedium
                            .override(
                              fontFamily: 'Outfit',
                              color: FlutterFlowTheme.of(context).primary,
                              fontSize: 32.0,
                              letterSpacing: 0.0,
                              fontWeight: FontWeight.w500,
                              useGoogleFonts:
                                  GoogleFonts.asMap().containsKey('Outfit'),
                            ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsetsDirectional.fromSTEB(
                          0.0, 4.0, 0.0, 0.0),
                      child: Text(
                        (_homeModel.ticket["success"] != Null)
                            ? ((_homeModel.ticket["success"])
                                ? 'Please wait while our system logs your ticket to the event'
                                : 'Please try to use a valid ticket. Thank you!')
                            : 'Please try to establish connection first in the Network Section from Quick Menu',
                        style:
                            FlutterFlowTheme.of(context).labelMedium.override(
                                  fontFamily: 'Plus Jakarta Sans',
                                  color: FlutterFlowTheme.of(context).primary,
                                  fontSize: 14.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w500,
                                  useGoogleFonts: GoogleFonts.asMap()
                                      .containsKey('Plus Jakarta Sans'),
                                ),
                      ),
                    ),
                    Container(
                      width: 100.0,
                      height: 100.0,
                      decoration: const BoxDecoration(),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
