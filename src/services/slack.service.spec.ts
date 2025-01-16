import { Test, TestingModule } from '@nestjs/testing';
import { SlackService } from './slack.service';
import { ModuleRef } from '@nestjs/core';
import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';
import { InvalidEventException } from '../exceptions/invalid-event.exception';

describe('SlackService', () => {
  let service: SlackService;
  let moduleRef: ModuleRef;
  let mockApp: jest.Mocked<Partial<App>>;
  let moduleRefSpy: jest.SpyInstance;
  let metadataSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    mockApp = {
      start: jest.fn(),
      message: jest.fn(),
      command: jest.fn(),
      action: jest.fn(),
      event: jest.fn(),
      shortcut: jest.fn(),
      view: jest.fn(),
      client: new WebClient('xoxb-dummy-token'),
    };

    const mockModuleRef = {
      get: jest.fn(),
      resolve: jest.fn(),
      create: jest.fn(),
      introspect: jest.fn(),
      registerRequestByContextId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        {
          provide: 'CONNECTION',
          useValue: mockApp,
        },
        {
          provide: ModuleRef,
          useValue: mockModuleRef,
        },
      ],
    }).compile();

    service = module.get<SlackService>(SlackService);
    moduleRef = module.get<ModuleRef>(ModuleRef);
  });

  afterEach(() => {
    // Restore all spies after each test
    if (moduleRefSpy) {
      moduleRefSpy.mockRestore();
      moduleRefSpy = null;
    }
    if (metadataSpy) {
      metadataSpy.mockRestore();
      metadataSpy = null;
    }
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should start the app on module init', () => {
      service.onModuleInit();
      expect(mockApp.start).toHaveBeenCalled();
    });
  });

  describe('getters', () => {
    it('should return app instance', () => {
      expect(service.app).toBe(mockApp);
    });

    it('should return client instance', () => {
      expect(service.client).toBe(mockApp.client);
    });
  });

  describe('message registration', () => {
    it('should register message handlers', () => {
      const mockHandler = {
        pattern: 'hello',
        propertyKey: 'handleHello',
      };

      const mockInstance = {
        handleHello: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerMessages([class TestHandler {}]);

      expect(mockApp.message).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('command registration', () => {
    it('should register command handlers', () => {
      const mockHandler = {
        pattern: '/test-command',
        propertyKey: 'handleCommand',
      };

      const mockInstance = {
        handleCommand: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerCommands([class TestCommandHandler {}]);

      expect(mockApp.command).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });

    it('should handle multiple commands from single handler', () => {
      const mockHandlers = [
        {
          pattern: '/command1',
          propertyKey: 'handleCommand1',
        },
        {
          pattern: '/command2',
          propertyKey: 'handleCommand2',
        },
      ];

      const mockInstance = {
        handleCommand1: jest.fn(),
        handleCommand2: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue(mockHandlers);

      service.registerCommands([class TestMultiCommandHandler {}]);

      expect(mockApp.command).toHaveBeenCalledTimes(2);
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('action registration', () => {
    it('should register action handlers', () => {
      const mockHandler = {
        pattern: 'button_click',
        propertyKey: 'handleAction',
      };

      const mockInstance = {
        handleAction: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerActions([class TestActionHandler {}]);

      expect(mockApp.action).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });

    it('should handle multiple actions from single handler', () => {
      const mockHandlers = [
        {
          pattern: 'button_1_click',
          propertyKey: 'handleButton1',
        },
        {
          pattern: 'button_2_click',
          propertyKey: 'handleButton2',
        },
      ];

      const mockInstance = {
        handleButton1: jest.fn(),
        handleButton2: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue(mockHandlers);

      service.registerActions([class TestMultiActionHandler {}]);

      expect(mockApp.action).toHaveBeenCalledTimes(2);
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('event registration', () => {
    it('should register event handlers', () => {
      const mockHandler = {
        pattern: 'app_mention',
        propertyKey: 'handleEvent',
      };

      const mockInstance = {
        handleEvent: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerEvents([class TestEventHandler {}]);

      expect(mockApp.event).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });

    it('should handle multiple events from single handler', () => {
      const mockHandlers = [
        {
          pattern: 'app_mention',
          propertyKey: 'handleMention',
        },
        {
          pattern: 'app_home_opened',
          propertyKey: 'handleHomeOpened',
        },
      ];

      const mockInstance = {
        handleMention: jest.fn(),
        handleHomeOpened: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue(mockHandlers);

      service.registerEvents([class TestMultiEventHandler {}]);

      expect(mockApp.event).toHaveBeenCalledTimes(2);
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('shortcut registration', () => {
    it('should register shortcut handlers', () => {
      const mockHandler = {
        pattern: 'my_shortcut',
        propertyKey: 'handleShortcut',
      };

      const mockInstance = {
        handleShortcut: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerShortcuts([class TestShortcutHandler {}]);

      expect(mockApp.shortcut).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('view registration', () => {
    it('should register view handlers', () => {
      const mockHandler = {
        pattern: 'view_1',
        propertyKey: 'handleView',
      };

      const mockInstance = {
        handleView: jest.fn(),
      };

      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(mockInstance);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([mockHandler]);

      service.registerViews([class TestViewHandler {}]);

      expect(mockApp.view).toHaveBeenCalled();
      expect(moduleRef.get).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should throw InvalidEventException when handler instance is not found', () => {
      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue(null);
      metadataSpy = jest
        .spyOn(Reflect, 'getMetadata')
        .mockReturnValue([{ pattern: 'test', propertyKey: 'handle' }]);

      expect(() =>
        service.registerMessages([class TestHandler {}]),
      ).toThrowError(InvalidEventException);
    });

    it('should handle empty metadata gracefully', () => {
      moduleRefSpy = jest.spyOn(moduleRef, 'get').mockReturnValue({});
      metadataSpy = jest.spyOn(Reflect, 'getMetadata').mockReturnValue([]);

      service.registerMessages([class TestHandler {}]);

      expect(moduleRef.get).toHaveBeenCalled();
      expect(mockApp.message).not.toHaveBeenCalled();
    });
  });

  describe('module initialization lifecycle', () => {
    it('should start the app during module initialization', async () => {
      mockApp.start = jest.fn().mockResolvedValue(undefined);
      await service.onModuleInit();
      expect(mockApp.start).toHaveBeenCalled();
    });

    it('should handle app start failure gracefully', async () => {
      mockApp.start = jest
        .fn()
        .mockRejectedValue(new Error('Failed to start app'));
      await expect(service.onModuleInit()).rejects.toThrow(
        'Failed to start app',
      );
    });
  });
});
